// src/components/Header.js
import { Link } from "react-router-dom";

function Header({ user, logoutUser }) {
   return (
      <nav>
         <Link to="/">Главная</Link> | <Link to="/catalog">Каталог пицц</Link> |{" "}
         <Link to="/cart">Корзина</Link> |{" "}
         {user ? (
            <>
               <Link to="/profile">Личный кабинет</Link> |{" "}
               <button onClick={logoutUser}>Выйти</button>
            </>
         ) : (
            <Link to="/login">Авторизация</Link>
         )}
      </nav>
   );
}

export default Header;
