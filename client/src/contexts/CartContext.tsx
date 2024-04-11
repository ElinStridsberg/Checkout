import React, { useState, useEffect, PropsWithChildren, createContext, useContext } from 'react';

export interface Product {
    id: string,
    name: string,
    description: string,
    images: string[],  
    default_price: {
        id: string,
        unit_amount: number
    }
}

export interface CartItem {
    product: Product,
    quantity: number
}

interface ICartContext {
    cart: CartItem[],
    addToCart: (product: Product) => void
}

const initialValues = {
    cart: [],
    addToCart: () => { }
}

const CartContext = createContext<ICartContext>(initialValues)
export const useCart = () => useContext(CartContext)

const CartProvider: React.FC<PropsWithChildren> = ({ children }) => {
    const [cart, setCart] = useState<CartItem[]>(() => {
        const lsData = localStorage.getItem("cart")
        return lsData ? JSON.parse(lsData) : []
    })

    useEffect(() => {
        localStorage.setItem("cart", JSON.stringify(cart))
    }, [cart])

    const addToCart = (product: Product) => {
        console.log('Added to cart:', product.name); // Loggar den valda produkten
        const productAlreadyExists = cart.find(item => item.product.id === product.id);
    
        if (productAlreadyExists) {
            setCart(prevCart => 
                prevCart.map(item =>
                    item.product.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
                )
            );
         } else {
            // Create a new CartItem with only necessary properties
            const newCartItem: CartItem = {
                product: {
                    id: product.id,
                    name: product.name,
                    description: product.description,
                    images: product.images,
                    default_price: {
                        id: product.default_price.id,
                        unit_amount: product.default_price.unit_amount
                    }
                },
                quantity: 1
            };
            setCart([...cart, newCartItem]);
        }
    };

    return (
        <CartContext.Provider value={{ cart, addToCart }}>
            {children}
        </CartContext.Provider>
    )
}

export default CartProvider;
