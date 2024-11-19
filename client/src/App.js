import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Header from "./components/Header";

import Home from "./pages/Home";
import Catalog from "./pages/Catalog";
import PizzaDetail from "./pages/PizzaDetail";
import Cart from "./pages/Cart";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Profile from "./pages/Profile";

function App() {
   const [pizzas, setPizzas] = useState([]);
   const [cart, setCart] = useState([]);
   const [user, setUser] = useState(localStorage.getItem("user") || null);

   useEffect(() => {
      fetch("/api/pizzas")
         .then((response) => response.json())
         .then((data) => setPizzas(data));

      const savedCart = localStorage.getItem("cart");
      if (savedCart) setCart(JSON.parse(savedCart));
   }, []);

   const addToCart = (pizza) => {
      setCart((prevCart) => {
         const updatedCart = [...prevCart];
         const pizzaInCart = updatedCart.find((item) => item.id === pizza.id);
         if (pizzaInCart) pizzaInCart.quantity += 1;
         else updatedCart.push({ ...pizza, quantity: 1 });
         localStorage.setItem("cart", JSON.stringify(updatedCart));
         return updatedCart;
      });
   };

   const loginUser = (userData) => {
      localStorage.setItem("user", userData);
      setUser(userData);
   };

   const logoutUser = () => {
      localStorage.clear();
      setUser(null);
      setCart([]);
   };

   return (
      <Router>
         <Header user={user} logoutUser={logoutUser} />
         <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/catalog" element={<Catalog pizzas={pizzas} />} />
            <Route
               path="/pizza/:id"
               element={<PizzaDetail pizzas={pizzas} addToCart={addToCart} />}
            />
            <Route path="/cart" element={<Cart cart={cart} />} />
            <Route path="/login" element={<Login loginUser={loginUser} />} />
            <Route
               path="/register"
               element={<Register loginUser={loginUser} />}
            />
            <Route path="/profile" element={<Profile user={user} />} />
         </Routes>
      </Router>
   );
}

export default App;
