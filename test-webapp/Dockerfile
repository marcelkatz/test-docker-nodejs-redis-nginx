FROM node:alpine

WORKDIR /usr/src/app

# Wildcard used to copy to container "package.json" AND "package-lock.json"
COPY ./package*.json ./
RUN npm install
COPY ./server.js ./

CMD ["npm","start"]
