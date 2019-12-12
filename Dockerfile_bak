FROM mhart/alpine-node:8

ENV NODE_VERSION 8.9.4

RUN apk add --no-cache make gcc g++ python bash

WORKDIR /var/momocraftweb

COPY bin/ /var/momocraftweb/bin/
COPY controller/ /var/momocraftweb/controller/
COPY models/ /var/momocraftweb/models/
COPY public/ /var/momocraftweb/public/
COPY routes/ /var/momocraftweb/routes/
COPY SSL/ /var/momocraftweb/SSL/
COPY util/ /var/momocraftweb/util/
COPY views/ /var/momocraftweb/views/



COPY app.js /var/momocraftweb/
COPY package.json /var/momocraftweb/

RUN npm install

EXPOSE 800
EXPOSE 443

ENTRYPOINT ["npm", "start"]
