// src/components/Register.js
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

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

export default Register;
