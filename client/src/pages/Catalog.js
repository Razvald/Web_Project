import React, { useEffect, useState } from "react";

const Catalog = ({ addToCart }) => {
   const [pizzas, setPizzas] = useState([]); // Гарантирует, что начальное значение — массив

   useEffect(() => {
      const fetchPizzas = async () => {
         try {
            const response = await fetch("/api/pizzas");
            const data = await response.json();
            if (Array.isArray(data)) {
               setPizzas(data);
            } else {
               console.error("Получены некорректные данные:", data);
               setPizzas([]); // Устанавливаем пустой массив, если данные некорректны
            }
         } catch (error) {
            console.error("Ошибка при получении данных:", error);
            setPizzas([]); // Устанавливаем пустой массив в случае ошибки
         }
      };
      fetchPizzas();
   }, []);

   return (
      <div>
         <h1>Каталог пицц</h1>
         <ul>
            {pizzas.map((pizza) => (
               <li key={pizza.Product_Id} style={{ marginBottom: "20px" }}>
                  <h2>{pizza.Name}</h2>
                  <p>{pizza.Description}</p>
                  <p>Цена: {pizza.Price} ₽</p>
                  <img
                     src={pizza.Image_url}
                     alt={pizza.Name}
                     style={{ maxWidth: "200px" }}
                  />
                  <br />
                  <button
                     onClick={() => {
                        console.log(
                           `Нажали на кнопку для добавления пиццы с ID ${pizza.Product_Id}`
                        );
                        addToCart({
                           id: pizza.Product_Id,
                           name: pizza.Name,
                           price: pizza.Price,
                           quantity: 1,
                        });
                     }}
                  >
                     Добавить в корзину
                  </button>
               </li>
            ))}
         </ul>
      </div>
   );
};

export default Catalog;
