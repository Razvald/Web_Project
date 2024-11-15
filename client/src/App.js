// client/src/App.js
import React, { useEffect, useState } from "react";
import {
   BrowserRouter as Router,
   Routes,
   Route,
   Link,
   useParams,
   useNavigate,
} from "react-router-dom";

function App() {
   const [pizzas, setPizzas] = useState([]);
   const [cart, setCart] = useState([]);
   const [user, setUser] = useState(localStorage.getItem("user") || null); // Состояние пользователя

   useEffect(() => {
      fetch("/api/pizzas")
         .then((response) => response.json())
         .then((data) => {
            setPizzas(data);
         });

      const savedCart = localStorage.getItem("cart"); // Загрузка корзины
      if (savedCart) {
         setCart(JSON.parse(savedCart));
      }
   }, []);

   // Добавление пиццы в корзину
   const addToCart = (pizza) => {
      setCart((prevCart) => {
         const updatedCart = [...prevCart];
         const pizzaInCart = updatedCart.find((item) => item.id === pizza.id);
         if (pizzaInCart) {
            pizzaInCart.quantity += 1;
         } else {
            updatedCart.push({ ...pizza, quantity: 1 });
         }
         localStorage.setItem("cart", JSON.stringify(updatedCart)); // Сохранение корзины
         return updatedCart;
      });
   };

   // Авторизация пользователя
   const loginUser = (userData) => {
      localStorage.setItem("user", userData);
      setUser(userData);
   };

   // Выход из аккаунта
   const logoutUser = () => {
      localStorage.removeItem("user");
      localStorage.removeItem("cart"); // Очистка корзины
      setUser(null);
      setCart([]); // Очистка состояния корзины
   };

   return (
      <Router>
         <nav>
            <Link to="/">Главная</Link> |{" "}
            <Link to="/catalog">Каталог пицц</Link> |
            <Link to="/cart">Корзина</Link> |
            {user ? (
               <>
                  <Link to="/profile">Личный кабинет</Link> |
                  <button onClick={logoutUser}>Выйти</button>
               </>
            ) : (
               <Link to="/login">Авторизация</Link>
            )}
         </nav>
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

// Компонент для главной страницы
function Home() {
   return <h1>Добро пожаловать на сайт пиццерии!</h1>;
}

// Каталог пицц
function Catalog({ pizzas }) {
   return (
      <div>
         <h1>Каталог пицц</h1>
         <ul>
            {pizzas.map((pizza) => (
               <li key={pizza.id}>
                  <Link to={`/pizza/${pizza.id}`}>
                     {pizza.name} - {pizza.price} руб
                  </Link>
               </li>
            ))}
         </ul>
      </div>
   );
}

// Детали пиццы
function PizzaDetail({ pizzas, addToCart }) {
   const { id } = useParams();
   const pizza = pizzas.find((p) => p.id === parseInt(id));

   if (!pizza) return <p>Пицца не найдена!</p>;

   return (
      <div>
         <h2>{pizza.name}</h2>
         <p>Цена: {pizza.price} руб</p>
         <p>Состав: {pizza.ingredients.join(", ")}</p>
         <button onClick={() => addToCart(pizza)}>Добавить в корзину</button>
      </div>
   );
}

// Корзина
function Cart({ cart }) {
   const totalPrice = cart.reduce(
      (acc, item) => acc + item.price * item.quantity,
      0
   );

   return (
      <div>
         <h1>Корзина</h1>
         {cart.length === 0 ? (
            <p>Ваша корзина пуста</p>
         ) : (
            <ul>
               {cart.map((item) => (
                  <li key={item.id}>
                     <h2>{item.name}</h2>
                     <p>Цена: {item.price} руб</p>
                     <p>Количество: {item.quantity}</p>
                     <p>Сумма: {item.price * item.quantity} руб</p>
                  </li>
               ))}
            </ul>
         )}
         <h3>Итого: {totalPrice} руб</h3>
      </div>
   );
}

// Форма авторизации
function Login({ loginUser }) {
   const [username, setUsername] = useState("");
   const navigate = useNavigate();

   const handleLogin = (e) => {
      e.preventDefault();
      loginUser(username);
      navigate("/profile");
   };

   return (
      <div>
         <h1>Авторизация</h1>
         <form onSubmit={handleLogin}>
            <input
               type="text"
               placeholder="Имя пользователя"
               value={username}
               onChange={(e) => setUsername(e.target.value)}
               required
            />
            <button type="submit">Войти</button>
         </form>
         <p>
            Нет аккаунта? <Link to="/register">Зарегистрироваться</Link>
         </p>
      </div>
   );
}

// Форма регистрации
function Register({ loginUser }) {
   const [username, setUsername] = useState("");
   const navigate = useNavigate();

   const handleRegister = (e) => {
      e.preventDefault();
      localStorage.setItem("user", username);
      loginUser(username);
      navigate("/profile");
   };

   return (
      <div>
         <h1>Регистрация</h1>
         <form onSubmit={handleRegister}>
            <input
               type="text"
               placeholder="Имя пользователя"
               value={username}
               onChange={(e) => setUsername(e.target.value)}
               required
            />
            <button type="submit">Зарегистрироваться</button>
         </form>
         <p>
            Уже есть аккаунт? <Link to="/login">Войти</Link>
         </p>
      </div>
   );
}

// Личный кабинет
function Profile({ user }) {
   if (!user) return <p>Пожалуйста, войдите в систему.</p>;

   return (
      <div>
         <h1>Личный кабинет</h1>
         <p>Добро пожаловать, {user}!</p>
      </div>
   );
}

export default App;
