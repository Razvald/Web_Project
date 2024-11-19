// src/components/Cart.js
function Cart({ cart }) {
   const totalPrice = cart.reduce(
      (acc, item) => acc + item.price * item.quantity,
      0
   );

   return (
      <div>
         <h1>Корзина</h1>
         {cart.length === 0 ? (
            <p>Ваша корзина пуста</p>
         ) : (
            <ul>
               {cart.map((item) => (
                  <li key={item.id}>
                     <h2>{item.name}</h2>
                     <p>Цена: {item.price} руб</p>
                     <p>Количество: {item.quantity}</p>
                     <p>Сумма: {item.price * item.quantity} руб</p>
                  </li>
               ))}
            </ul>
         )}
         <h3>Итого: {totalPrice} руб</h3>
      </div>
   );
}

export default Cart;
