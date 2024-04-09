import { useState, useEffect } from 'react';
import { useCart } from '../contexts/CartContext';
import Header from '../pages/Header';

const ProductList = () => {
    const [products, setProducts] = useState<Product[]>()
    const { addToCart } = useCart();
       
    useEffect(() => {
        const fetchProducts = async () => {
            const response = await fetch("http://localhost:3001/products")
            const data = await response.json()
            setProducts(data.data)
        }
        fetchProducts()
    }, [])

    const handleAddToCart = (product: Product) => {
        console.log(product); // Visa produkten i konsolen
        addToCart(product);
    }

    return (
        <>
        <Header />
            <div>
                {products?.map((product: Product) => (
                    <div key={product.id}>
                        <img src={product.images} className='ProductImg'/>
                        <h3>{product.name}</h3>
                        <p>{product.default_price.unit_amount / 100} kr</p>
                        <button onClick={() => handleAddToCart(product)}>Lägg till i kundvagn</button>
                    </div>
                ))}
            </div>
        </>
    )
}

export default ProductList;
