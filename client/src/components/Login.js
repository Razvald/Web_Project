// src/components/Login.js
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

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

export default Login;
