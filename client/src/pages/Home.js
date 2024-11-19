import React from "react";
import { Link } from "react-router-dom";

function Home() {
   return (
      <div>
         <h1>Welcome to Pizza Store!</h1>
         <p>Order your favorite pizzas online!</p>
         <Link to="/catalog">Browse Catalog</Link>
      </div>
   );
}

export default Home;
