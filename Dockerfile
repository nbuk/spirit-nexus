FROM node:22

WORKDIR /www/app

COPY . .

RUN npm i && npm run build

EXPOSE 3000
CMD [ "npm", "run", "start" ]