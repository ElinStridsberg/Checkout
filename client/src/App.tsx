import ProductList from './pages/ProductList';
import CartProvider from './contexts/CartContext';
import Header from './pages/Header';

const App = () => {
    return (
        <CartProvider>
             <Header />
        <ProductList />
        </CartProvider>
    );
}

export default App;
