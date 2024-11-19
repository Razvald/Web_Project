export const getPizzas = async () => {
   const response = await fetch("/api/pizzas");
   return response.json();
};
