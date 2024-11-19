// src/components/Catalog.js
import { Link } from "react-router-dom";

function Catalog({ pizzas }) {
   return (
      <div>
         <h1>Каталог пицц</h1>
         <ul>
            {pizzas.map((pizza) => (
               <li key={pizza.id}>
                  <Link to={`/pizza/${pizza.id}`}>
                     {pizza.name} - {pizza.price} руб
                  </Link>
               </li>
            ))}
         </ul>
      </div>
   );
}

export default Catalog;
