FROM node:14

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

RUN npm ci --only=production

COPY ./dist ./dist

EXPOSE 80
CMD [ "node", "./dist/main.js" ]
