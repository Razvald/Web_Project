// client/src/App.js
import React, { useEffect, useState } from "react";

function App() {
   const [pizzas, setPizzas] = useState([]);

   useEffect(() => {
      fetch("/api/pizzas")
         .then((response) => response.json())
         .then((data) => {
            setPizzas(data);
         });
   }, []);

   return (
      <div>
         <h1>Наши пиццы</h1>
         {pizzas.length === 0 ? (
            <p>Загрузка...</p>
         ) : (
            <ul>
               {pizzas.map((pizza) => (
                  <li key={pizza.id}>
                     <h2>{pizza.name}</h2>
                     <p>Цена: {pizza.price} руб</p>
                     <p>Состав: {pizza.ingredients.join(", ")}</p>
                  </li>
               ))}
            </ul>
         )}
      </div>
   );
}

export default App;
