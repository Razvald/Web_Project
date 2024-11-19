import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Header from "./components/Header";
import Home from "./pages/Home";
import Catalog from "./pages/Catalog";
import Cart from "./pages/Cart";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Profile from "./pages/Profile";

function App() {
   const [pizzas, setPizzas] = useState([]);
   const [cart, setCart] = useState([]);
   const [user, setUser] = useState(localStorage.getItem("user") || null);

   useEffect(() => {
      console.log("useEffect - компоненты загружены");
      fetch("/api/pizzas")
         .then((response) => response.json())
         .then((data) => setPizzas(data));

      const savedCart = localStorage.getItem("cart");
      if (savedCart) {
         console.log("Загружена корзина из localStorage");
         setCart(JSON.parse(savedCart));
      }
   }, []); // Выполняется только один раз при монтировании компонента

   const addToCart = (pizza) => {
      console.log("Добавление в корзину:", pizza);

      setCart((prevCart) => {
         // Клонируем корзину, создавая новый массив
         const updatedCart = [...prevCart];

         // Ищем товар в корзине
         const existingPizza = updatedCart.find((item) => item.id === pizza.id);

         if (existingPizza) {
            console.log(
               `Товар с ID ${pizza.id} уже есть в корзине. Увеличиваем количество.`
            );
            // Создаем новый объект для существующего товара
            return updatedCart.map((item) =>
               item.id === pizza.id
                  ? { ...item, quantity: item.quantity + 1 }
                  : item
            );
         } else {
            console.log(`Товар с ID ${pizza.id} добавлен в корзину.`);
            // Добавляем новый товар в корзину
            return [...updatedCart, { ...pizza, quantity: 1 }];
         }
      });
   };

   const nullCart = () => {
      setCart([]);
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
            <Route
               path="/catalog"
               element={<Catalog pizzas={pizzas} addToCart={addToCart} />}
            />
            <Route
               path="/cart"
               element={<Cart cart={cart} nullCart={nullCart} />}
            />
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
