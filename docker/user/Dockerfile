FROM node:20.10.0-slim
EXPOSE 3000
WORKDIR /user

# RUN apk update && \
#   apk upgrade

# パッケージファイルをコピー
COPY ./user/package*.json ./

# 依存関係をインストール
RUN npm install -g npm@10.8.3
RUN npm install

COPY ./user .

CMD ["npm", "run", "dev"]
