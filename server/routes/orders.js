// server/routes/orders.js
const express = require("express");
const router = express.Router();
const { queryDatabase } = require("../db");

router.get("/", async (req, res) => {
   try {
      const query = `
         SELECT o.Order_Id, o.Total_Price, o.Order_Date, s.Title AS Status
         FROM Orders o
         JOIN Status s ON o.Status_Id = s.Status_Id
      `;
      const orders = await queryDatabase(query);
      res.json(orders);
   } catch (error) {
      res.status(500).json({ error: "Ошибка получения данных о заказах" });
   }
});

module.exports = router;
