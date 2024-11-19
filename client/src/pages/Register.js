import React, { useState } from "react";

function Register({ loginUser }) {
   const [username, setUsername] = useState("");

   const handleRegister = () => {
      loginUser(username);
   };

   return (
      <div>
         <h1>Register</h1>
         <input
            type="text"
            placeholder="Choose a username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
         />
         <button onClick={handleRegister}>Register</button>
      </div>
   );
}

export default Register;
