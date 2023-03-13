# Package builder
FROM --platform=linux/amd64 node:16.17.0-alpine as package_install

WORKDIR /app

COPY package.json ./
RUN npm install 

# Package Builder
FROM --platform=linux/amd64 node:16.17.0-alpine as express_dev

WORKDIR /app

COPY . .
COPY --from=package_install /app/node_modules ./node_modules

CMD ["npm", "run", "dev"]

