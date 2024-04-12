import { useState, useEffect } from 'react';
import { Product, useCart } from "../contexts/CartContext"
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


    return (
        <>
        <Header />
        <div className='Heading'>
            
     
        </div>

            <div className='ProductContent'>
                {products?.map((product: Product) => (
                    <div key={product.id} className='list'>
                        <img src={product.images} className='ProductImg'/>
                        <h5>{product.name}</h5>
                        <p className='price'>{product.default_price.unit_amount / 100} kr</p>
                        <button onClick={() => addToCart(product)} className='Buy'>Köp</button>
                    </div>
                ))}
            </div>
        </>
    )
}

export default ProductList;
