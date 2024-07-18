FROM node:18.1.0-alpine

WORKDIR /usr/src/app

COPY package*.json .

RUN npm install

RUN apk add --no-cache \
chromium \
nss \
freetype \
freetype-dev \
harfbuzz \
ca-certificates \
ttf-freefont \
nodejs

COPY . .

COPY .env ./

RUN npm run build

EXPOSE 3000

CMD [ "npm", "run", "start:dev" ]