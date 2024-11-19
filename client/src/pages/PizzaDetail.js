import React from "react";
import { useParams } from "react-router-dom";

function PizzaDetail({ pizzas, addToCart }) {
   const { id } = useParams();
   const pizza = pizzas.find((p) => p.id === parseInt(id));

   if (!pizza) {
      return <h2>Pizza not found!</h2>;
   }

   return (
      <div>
         <h1>{pizza.name}</h1>
         <p>Price: {pizza.price} ₽</p>
         <p>Ingredients: {pizza.ingredients.join(", ")}</p>
         <button onClick={() => addToCart(pizza)}>Add to Cart</button>
      </div>
   );
}

export default PizzaDetail;
