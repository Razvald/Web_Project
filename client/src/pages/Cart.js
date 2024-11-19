import React from "react";

function Cart({ cart }) {
   const total = cart.reduce(
      (acc, item) => acc + item.price * item.quantity,
      0
   );

   return (
      <div>
         <h1>Shopping Cart</h1>
         {cart.length === 0 ? (
            <p>Your cart is empty!</p>
         ) : (
            <ul>
               {cart.map((item) => (
                  <li key={item.id}>
                     {item.name} - {item.quantity} x {item.price} ₽
                  </li>
               ))}
            </ul>
         )}
         <h2>Total: {total} ₽</h2>
      </div>
   );
}

export default Cart;
