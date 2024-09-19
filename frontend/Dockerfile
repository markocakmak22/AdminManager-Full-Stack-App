FROM node:18

WORKDIR /admin-manager
COPY ./admin-manager/package*.json ./

RUN npm install
EXPOSE 3000

CMD ["npm", "start"]