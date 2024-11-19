import React, { useEffect, useState } from "react";

const Catalog = () => {
   const [pizzas, setPizzas] = useState([]);

   useEffect(() => {
      const fetchPizzas = async () => {
         const response = await fetch("/api/pizzas");
         const data = await response.json();
         setPizzas(data);
      };
      fetchPizzas();
   }, []);

   return (
      <div>
         <h1>Каталог пицц</h1>
         <ul>
            {pizzas.map((pizza) => (
               <li key={pizza.Product_Id}>
                  <h2>{pizza.Name}</h2>
                  <p>{pizza.Description}</p>
                  <p>Цена: {pizza.Price} ₽</p>
                  <img src={pizza.Image_url} alt={pizza.Name} />
               </li>
            ))}
         </ul>
      </div>
   );
};

export default Catalog;
