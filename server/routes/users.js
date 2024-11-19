// server/routes/users.js
const express = require("express");
const router = express.Router();
const { queryDatabase } = require("../db");

router.get("/", async (req, res) => {
   try {
      const query = "SELECT * FROM Users";
      const users = await queryDatabase(query);
      res.json(users);
   } catch (error) {
      res.status(500).json({
         error: "Ошибка получения данных о пользователях",
      });
   }
});

module.exports = router;
