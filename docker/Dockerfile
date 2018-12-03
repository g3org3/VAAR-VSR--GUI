FROM node:10-alpine

RUN npm i -g serve

RUN mkdir /app
WORKDIR /app

COPY ./package.json ./package.json
RUN npm i
COPY . .
RUN npm run build

RUN mv build/* public/
RUN mkdir views && cp public/index.html views/index.html

COPY server/server.js .
CMD ["node", "server.js"]