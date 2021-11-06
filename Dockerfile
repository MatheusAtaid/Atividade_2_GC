FROM node:lts

WORKDIR /app

COPY . .

ENV NAME 'Augusto'

RUN npm install
RUN npm run build

CMD ["npm", "run", "start"]