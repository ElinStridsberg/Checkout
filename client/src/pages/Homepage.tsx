import { Link } from "react-router-dom"

export const Homepage = () => {

    return (
        <>            
        <div className="homeContainer">
                <h1>HomePage</h1>
            <div className="buttonContainer">
            <Link to="/login">
                <button>Login</button>
            </Link>
            <Link to="/register">
                <button>Register</button>
            </Link>
           </div> 
        </div>
        </>
    )
}