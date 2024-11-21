// server/routes/pizzas.js
const express = require("express");
const router = express.Router();
const { queryDatabase } = require("../db");

router.get("/", async (req, res) => {
   try {
      const query = "SELECT * FROM Products";
      const pizzas = await queryDatabase(query);
      res.json(pizzas);
   } catch (error) {
      res.status(500).json({ error: "Ошибка получения данных о пиццах"});
   }
});

module.exports = router;
