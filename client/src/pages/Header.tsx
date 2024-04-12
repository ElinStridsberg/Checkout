import { useCart } from "../contexts/CartContext";
import { Link } from "react-router-dom";
import { BsCart2 } from "react-icons/bs";

export const Header = () => {
    const { cart } = useCart();

    return (
        <div className="header">
            <div className="cart">
                <Link to="/cart">
                    <BsCart2 />
                </Link>
            </div>
        </div>
    );
}

export default Header;
