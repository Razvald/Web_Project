import React from "react";
import { Link } from "react-router-dom";

function Header({ user, logoutUser }) {
   return (
      <header>
         <nav>
            <Link to="/">Home</Link> | <Link to="/catalog">Catalog</Link> |{" "}
            <Link to="/cart">Cart</Link> |{" "}
            {user ? (
               <>
                  <Link to="/profile">Profile</Link>
                  <button onClick={logoutUser}>Logout</button>
               </>
            ) : (
               <Link to="/login">Login</Link>
            )}
         </nav>
      </header>
   );
}

export default Header;
