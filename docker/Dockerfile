FROM node:10-alpine

RUN npm i -g serve

RUN mkdir /build
WORKDIR /build
RUN npm i express ejs body-parser node-fetch

COPY build public
COPY build/index.html views/index.html
COPY server/server.js .

CMD ["node", "server.js"]