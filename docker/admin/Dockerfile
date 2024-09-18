FROM node:18.17.0-alpine3.18
EXPOSE 3001
WORKDIR /admin

RUN apk update && \
  apk upgrade

COPY ./admin/package*.json ./
RUN npm install -g npm@10.8.3
RUN npm install

COPY ./admin .

CMD ["npm", "run", "dev"]
