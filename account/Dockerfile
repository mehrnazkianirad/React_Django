FROM node:lts-alpin

WORKDIR /app

COPY package.json

RUN npm install 

COPY . .

RUN npm run build

CMD ["nginx", "-g", "daemon off;"]