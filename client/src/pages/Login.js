import React, { useState } from "react";

function Login() {
   const [email, setEmail] = useState("");
   const [password, setPassword] = useState("");

   const handleLogin = async () => {
      try {
         const response = await fetch("/api/auth/login", {
            method: "POST",
            headers: {
               "Content-Type": "application/json",
            },
            body: JSON.stringify({ email, password }),
         });

         const data = await response.json();

         if (response.ok) {
            localStorage.setItem("token", data.token);
            alert("Login successful!");
         } else {
            alert(data.message);
         }
      } catch (error) {
         console.error("Login failed:", error);
      }
   };

   return (
      <div>
         <h1>Login</h1>
         <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
         />
         <input
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
         />
         <button onClick={handleLogin}>Login</button>
      </div>
   );
}

export default Login;
