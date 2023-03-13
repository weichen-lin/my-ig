# Personal Package builder
FROM --platform=linux/amd64 node:16.17.0-alpine as personal_install

WORKDIR /app

COPY .npmrc .
RUN npm install @weichen-lin/gdrive-select-and-drag@1.0.5

# Package Builder
FROM --platform=linux/amd64 node:16.17.0-alpine as package_install

WORKDIR /app

COPY . .
COPY --from=personal_install /app/node_modules ./node_modules
RUN npm install

CMD ["npm", "run", "dev"]

