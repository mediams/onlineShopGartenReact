FROM node:21.7.3
WORKDIR /app
COPY index.html .
COPY src .
COPY package.json .
COPY package-lock.json .
COPY public .
RUN npm install

CMD [ "npm", "run", "dev"]