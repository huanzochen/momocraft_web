FROM node:12.15.0

COPY . /app

WORKDIR /app

RUN npm install && npm cache clean --force

ENTRYPOINT ["npm", "start"]
