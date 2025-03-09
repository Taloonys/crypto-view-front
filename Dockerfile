FROM node:22.14-alpine AS build

WORKDIR /app

# Transfer Node.js dependencies
COPY package.json package-lock.json ./

RUN npm install -g npm@11.2.0
RUN npm install -D vite

COPY . .

EXPOSE 8081

RUN npm run build

CMD ["npm", "run", "preview"]