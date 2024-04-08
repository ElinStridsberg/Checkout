
import { BsCart2 } from "react-icons/bs";

const Header = () => {
   
    return (
        <div className="header">
            <div className="cart">
                <BsCart2 />
                {/* <p>{cart.length}</p> */}
            </div>
        </div>
    )
}

export default Header