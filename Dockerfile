# Stage 1: Build the application
FROM node:20 AS build

WORKDIR /usr/src/app

COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build  

# Stage 2: Create the production image
FROM node:lts-alpine

WORKDIR /usr/src/app

COPY --from=build /usr/src/app/package*.json ./
COPY --from=build /usr/src/app/dist ./dist

RUN npm install --only=production

EXPOSE 3000

CMD ["node", "./dist/index.js"]
