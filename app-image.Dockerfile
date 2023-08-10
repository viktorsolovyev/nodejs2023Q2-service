# syntax=docker/dockerfile:1

FROM node:18-alpine

WORKDIR /app

COPY package.json ./

RUN npm install

COPY . .

EXPOSE 4000

RUN npm run build

CMD [ "node", "dist/main.js" ]
