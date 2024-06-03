# Используем официальный образ Node.js
FROM node:latest

# Устанавливаем рабочую директорию внутри контейнера
WORKDIR /app

# Копируем файлы package.json и package-lock.json для установки зависимостей
COPY package*.json ./

# Устанавливаем зависимости
RUN npm install

# Копируем остальные файлы приложения
COPY . .

# Собираем приложение
RUN npm run build

# Указываем команду для запуска фронтенда
CMD ["npm", "start"]
