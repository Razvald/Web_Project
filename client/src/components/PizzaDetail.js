// src/components/PizzaDetail.js
import { useParams } from "react-router-dom";

function PizzaDetail({ pizzas, addToCart }) {
   const { id } = useParams();
   const pizza = pizzas.find((p) => p.id === parseInt(id));

   if (!pizza) return <p>Пицца не найдена!</p>;

   return (
      <div>
         <h2>{pizza.name}</h2>
         <p>Цена: {pizza.price} руб</p>
         <p>Состав: {pizza.ingredients.join(", ")}</p>
         <button onClick={() => addToCart(pizza)}>Добавить в корзину</button>
      </div>
   );
}

export default PizzaDetail;
