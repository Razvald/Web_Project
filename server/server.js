// server/server.js
const express = require("express");
const app = express();

// Данные для пиццы
const pizzas = [
   {
      id: 1,
      name: "Маргарита",
      price: 300,
      ingredients: ["сыр", "томатный соус", "базилик"],
   },
   {
      id: 2,
      name: "Пепперони",
      price: 350,
      ingredients: ["сыр", "томатный соус", "пепперони"],
   },
   {
      id: 3,
      name: "Гавайская",
      price: 400,
      ingredients: ["сыр", "томатный соус", "ананас", "ветчина"],
   },
];

// Новый маршрут для пиццы
app.get("/api/pizzas", (req, res) => {
   res.json(pizzas);
});

app.listen(5000, () => {
   console.log("Server running on port 5000");
});
