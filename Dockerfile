FROM node:latest

RUN mkdir -p /etc/

WORKDIR /etc/

COPY . .

RUN npm install

CMD ["npm", "run", "dataGenerator"]