FROM node:20-alpine

WORKDIR /app

COPY package*.json ./

RUN apk update && apk upgrade
RUN npm ci --omit=dev

COPY . .

EXPOSE 3000

CMD ["npm" , "start"]