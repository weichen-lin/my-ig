# Personal Package builder
FROM --platform=linux/amd64 node:16.17.0-alpine as personal_install

WORKDIR /app

COPY .npmrc ./
RUN npm install @weichen-lin/gdrive-select-and-drag@1.0.3

# Package Builder
FROM --platform=linux/amd64 node:16.17.0-alpine as package_install

WORKDIR /app

COPY package.json ./
COPY --from=personal_install /app/node_modules /app/node_modules
RUN npm install

# next builder
FROM --platform=linux/amd64 node:16.17.0-alpine as next_builder

WORKDIR /app

COPY --from=package_install /app/node_modules /app/node_modules
COPY . .
RUN npm run build

# next runner
FROM --platform=linux/amd64 node:16.17.0-alpine as next_runner

WORKDIR /app

COPY --from=next_builder /app/next.config.js /
COPY --from=next_builder /app/public /public
COPY --from=next_builder /app/package.json /package.json
COPY --from=next_builder /app/.next /.next
COPY --from=next_builder /app/node_modules /node_modules

CMD ["npm", "run", "start"]
