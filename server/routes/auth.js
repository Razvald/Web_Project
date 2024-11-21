const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { queryDatabase } = require("../db");

const router = express.Router();
const SECRET_KEY = "your_secret_key"; // Используйте более защищенный ключ

router.post("/register", async (req, res) => {
   const { email, password } = req.body;

   try {
      // Проверка, существует ли уже пользователь с таким Email
      const existingUser = await queryDatabase(
         "SELECT * FROM Users WHERE Email = ?",
         [email]
      );

      if (existingUser.length > 0) {
         return res.status(400).json({ message: "Email already exists" });
      }

      // Сохранение данных пользователя в базу без хэширования пароля
      const result = await queryDatabase(
         "INSERT INTO Users (Email, Password, Role_Id) VALUES (?, ?, ?)",
         [email, password, 2] // Пример с Role_Id = 2 (пользователь)
      );

      res.status(201).json({ message: "Registration successful!" });
   } catch (error) {
      console.error("Error during registration:", error);
      res.status(500).json({ message: "Internal server error" });
   }
});

router.post("/login", async (req, res) => {
   const { email, password } = req.body;

   try {
      // Проверка существования пользователя с таким Email
      const user = await queryDatabase("SELECT * FROM Users WHERE Email = ?", [
         email,
      ]);

      if (user.length === 0) {
         return res.status(401).json({ message: "Invalid email or password" });
      }

      // Сравнение пароля (пароль в базе данных и введенный пароль)
      if (user[0].Password !== password) {
         return res.status(401).json({ message: "Invalid email or password" });
      }

      // Генерация JWT (оставим для примера)
      const token = jwt.sign(
         { id: user[0].User_Id, email: user[0].Email },
         SECRET_KEY,
         { expiresIn: "1h" }
      );

      res.json({ token });
   } catch (error) {
      console.error("Error during login:", error);
      res.status(500).json({ message: "Internal server error" });
   }
});

module.exports = { router };
