import React, { useState } from "react";

function Register() {
   const [email, setEmail] = useState("");
   const [password, setPassword] = useState("");

   const handleRegister = async () => {
      try {
         const response = await fetch("/api/auth/register", {
            method: "POST",
            headers: {
               "Content-Type": "application/json",
            },
            body: JSON.stringify({ email, password }),
         });

         const data = await response.json();

         if (response.ok) {
            alert("Registration successful!");
         } else {
            alert(data.message);
         }
      } catch (error) {
         console.error("Registration failed:", error);
      }
   };

   return (
      <div>
         <h1>Register</h1>
         <input
            type="email"
            placeholder="Choose an email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
         />
         <input
            type="password"
            placeholder="Choose a password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
         />
         <button onClick={handleRegister}>Register</button>
      </div>
   );
}

export default Register;
