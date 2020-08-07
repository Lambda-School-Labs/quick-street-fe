import { createContext } from "react";

export const CartContext = createContext();

// export const CartProvider = ({ children }) => {

//   const [ cart, setCart ] = useState({
//     products: []
//   });


//   const addToCart = (item) => {
//     localStorage.setItem('cart', JSON.stringify({ ...cart, products: [...cart.products, item]}));
//     const cartItems = localStorage.getItem('cart');
//     setCart({ ...cart, products: [...cart.products, item]});
//   }

//   const removeFromCart = (item) => {
//     setCart(cart.filter(cartItem => item.id !== cartItem.id));
//   }

//   return (
//     <CartContext.Provider value={{ cart, addToCart, removeFromCart }}>
//       {children}
//     </CartContext.Provider>
//   )

// }
