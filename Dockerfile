FROM node:23-alpine AS build
WORKDIR /app
COPY package*.json ./
RUN npm install

FROM node:23-alpine AS development
WORKDIR /app
COPY --from=build /app/node_modules ./node_modules
COPY . .
CMD ["npm", "start"]


# Стадия production: минимальный запуск без dev-инструментов
FROM node:23-alpine AS production
WORKDIR /app
COPY --from=build /app/node_modules ./node_modules
COPY . .
CMD ["npm", "start"]
