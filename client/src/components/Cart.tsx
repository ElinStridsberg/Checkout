import { useEffect } from 'react';
import { useCart, CartItem } from "../contexts/CartContext"; // Uppdatera sökvägen till din CartContext
import { Payment } from '../pages/Payment';
import '../styling/Cart.css';

export const CartPage = () => {
    const { cart, addToCart } = useCart();  // Lägg till addToCart från context om du behöver den

    useEffect(() => {
        const storedCart = localStorage.getItem('cart');
        if (storedCart) {
            const parsedCart: CartItem[] = JSON.parse(storedCart);
            // Uppdatera cart i context om det finns sparade produkter i localStorage
            if (parsedCart.length > 0) {
                parsedCart.forEach(item => {
                    // Kontrollera om produkten redan finns i contextens cart
                    const productAlreadyExists = cart && cart.find(cartItem => cartItem.product.id === item.product.id);
                    if (!productAlreadyExists) {
                        // Lägg till produkten i contextens cart om den inte redan finns där
                        addToCart(item.product);
                    }
                });
            }
        }
    }, []);  // Tom beroende-array för att undvika oändlig loop


    return (
        <div>
            <h2>Varukorg</h2>
            <hr className='hr'></hr>
       
            <div>
            <ul>
                {cart && cart.map((cartItem, index) => (
                    <li key={index}>
                        <div>
                     <img src={cartItem.product.images} className='cartImg'/>
                      <h6>{cartItem.product.name}</h6>  
                      Pris: {cartItem.product.default_price.unit_amount/100} SEK.
                      <p>Antal: {cartItem.quantity} st.</p> 
                       </div> {/* Visa produktens pris multiplicerat med antal */}
                    </li>
                ))}
            </ul></div>
           <Payment />
           </div>
     
    );
};

export default CartPage;
