import { useCart } from "../contexts/CartContext";

import { BsCart2 } from "react-icons/bs";

export const Header = () => {

      const { cart } = useCart()

    return (
        <div className="header">
            <div className="cart">
                <BsCart2 />
                <p>{cart.length}</p>
            </div>
        </div>
    )
}

export default Header