import React, { useState } from "react";

function Login({ loginUser }) {
   const [username, setUsername] = useState("");

   const handleLogin = () => {
      loginUser(username);
   };

   return (
      <div>
         <h1>Login</h1>
         <input
            type="text"
            placeholder="Enter your username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
         />
         <button onClick={handleLogin}>Login</button>
      </div>
   );
}

export default Login;
