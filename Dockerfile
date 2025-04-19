# syntax=docker/dockerfile:1

# Стадия build: установка зависимостей
FROM node:20-alpine AS build
WORKDIR /app
COPY package*.json ./
RUN npm install

# Стадия development: удобна для локальной разработки
FROM node:20-alpine AS development
WORKDIR /app
COPY --from=build /app/node_modules ./node_modules
COPY . .
CMD ["npm", "start"]


# Стадия production: минимальный запуск без dev-инструментов
FROM node:20-alpine AS production
WORKDIR /app
COPY --from=build /app/node_modules ./node_modules
COPY . .
CMD ["npm", "start"]
