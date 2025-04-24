# syntax=docker/dockerfile:1

# === Стадия 1: Build ===
FROM node:20-alpine AS build
WORKDIR /app

# Установка зависимостей
COPY package*.json ./
RUN npm install -D tailwindcss postcss autoprefixer

# Создание конфигов вручную (вместо npx)
RUN echo "module.exports = {" \
    "content: ['./src/**/*.{js,jsx}']," \
    "theme: { extend: {} }," \
    "darkMode: 'class'," \
    "plugins: []," \
    "}" > tailwind.config.js

RUN echo "module.exports = {" \
    "plugins: { tailwindcss: {}, autoprefixer: {} }" \
    "}" > postcss.config.js

# Скопируем остальной код
COPY . .

# === Стадия 2: Development ===
FROM node:20-alpine AS development
WORKDIR /app
COPY --from=build /app/node_modules ./node_modules
COPY --from=build /app .

CMD ["npm", "start"]

# === Стадия 3: Production ===
FROM node:20-alpine AS production
WORKDIR /app
COPY --from=build /app/node_modules ./node_modules
COPY --from=build /app .

CMD ["npm", "start"]
