import React, { useState, useEffect } from 'react';

interface Product {
    id: string;
    name: string;
    description: string;
    price: number;
    // Lägg till andra egenskaper om det finns några
}

const ProductList: React.FC = () => {
    const [products, setProducts] = useState<Product[]>([]);

    useEffect(() => {
        fetch("http://localhost:3001/products")
            .then(response => response.json())
            .then((data: Product[]) => {
                console.log("Received products:", data); // Lägg till denna logg
                setProducts(data);
            })
            .catch(error => console.error("Error fetching products:", error));
    }, []);

    console.log("Rendering with products:", products); // Lägg till denna logg

    return (
        <div>
            <h1>Products</h1>
            <ul>
                <div className='ProductList'>
                {products.map(product => (
                    <li key={product.id}>
                        <h3>{product.name}</h3>
                        <p>{product.description}</p>
                        <p>Price: {product.price}</p>
                        <img src={product.images} className='ProductImg'/>
                    </li>
                ))}
                </div>
            </ul>
        </div>
    );
}

export default ProductList;
