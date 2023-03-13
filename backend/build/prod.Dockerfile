# Personal Package builder
FROM --platform=linux/amd64 node:16.17.0-alpine as package_install

WORKDIR /app

COPY package.json .
RUN npm install 

# Package Builder
FROM --platform=linux/amd64 node:16.17.0-alpine as express_build

WORKDIR /app

COPY . .
COPY --from=package_install /app/node_modules ./node_modules
RUN npm run build

# next builder
FROM --platform=linux/amd64 node:16.17.0-alpine as express_prod

WORKDIR /app

COPY --from=express_build /app/node_modules ./node_modules
COPY --from=express_build /app/dist ./dist
COPY --from=express_build /app/package.json ./

CMD ["npm", "run", "start"]


