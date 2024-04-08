import React, { useState, useEffect } from 'react';
import Header from './Header';

const ProductList = () => {
    const [products, setProducts] = useState<Product[]>()

   
    useEffect(() => {
        const fetchProducts = async () => {
            const response = await fetch("http://localhost:3001/products")
            const product = await response.json()
            console.log(product.data)
            setProducts(product.data)
        }
        fetchProducts()
    }, [])

    

    return (
    <>
        <Header />
        <div>
            {products?.map((product: Product) => (
                <div key={product.id}>
                    <img src={product.images} className='ProductImg'/>
                    <h3>{product.name}</h3>
                    <p>{product.default_price.unit_amount / 100} kr</p>
                    <button>Lägg till i kundvagn</button>
                </div>
            ))}
        </div>
    </>
    )
}

export default ProductList

function useCart(): { addToCart: any; } {
    throw new Error('Function not implemented.');
}
