FROM node:10-alpine

RUN npm i -g serve

RUN mkdir /build
WORKDIR /build
RUN npm i express ejs body-parser node-fetch

COPY ./package.json ./package.json
RUN npm i

COPY ./public ./public
COPY ./src ./src
RUN npm run build

RUN ls
RUN mv build public
RUN mkdir views && cp public/index.html views/index.html

COPY server/server.js .
COPY package.json .
CMD ["node", "server.js"]