FROM node:12.15.0

COPY server.js /app/
COPY app.js /app/
COPY package.json /app/
COPY controller/ /app/controller/
COPY models/ /app/models/
COPY public/ /app/public/
COPY routes/ /app/routes/
COPY util/ /app/util/
COPY views/ /app/views/

WORKDIR /app

RUN npm install && npm cache clean --force

ENTRYPOINT ["npm", "start"]
