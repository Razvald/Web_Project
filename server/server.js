const express = require("express");
const pizzasRouter = require("./routes/pizzas");
const usersRouter = require("./routes/users");
const ordersRouter = require("./routes/orders");

const app = express();
const PORT = 5000;

app.use(express.json());

app.use("/api/pizzas", pizzasRouter);
app.use("/api/users", usersRouter);
app.use("/api/orders", ordersRouter);

app.listen(PORT, () => {
   console.log(`Server is running on http://localhost:${PORT}`);
});
