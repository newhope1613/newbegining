# Input App Task

## 📖 Описание
Input App Task — это приложение для ввода формы расходов.  
Приложения базируется на Vite + React, Express, PostgreSQL и Sequilize(ORM).

## 🔧 Установка и запуск
Для начало работы установите зависимости для папок back и front с помощью npm install.
С помощью postgresSQL создайте таблицу "expenses" содержащую основные поля для хранения информации о расходах:
CREATE TABLE expenses (
    id SERIAL PRIMARY KEY,
    description TEXT NOT NULL,
    amount DECIMAL(10,2) NOT NULL,
    category VARCHAR(50),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
