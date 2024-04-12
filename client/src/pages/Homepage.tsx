import { useEffect, useState } from 'react';
import ProductList from './ProductList';
import Logo2 from '../images/Logo.jpg'
import LogoHome from '../images/LogoHomePage.jpg'


export const Homepage = () => {
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [isRegistered, setIsRegistered] = useState<boolean>(false);
    const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
    const [showForm, setShowForm] = useState<"register" | "login" | "none">("none");
    const [errorMessage, setErrorMessage] = useState<string>("");
    

    useEffect(() => {
        const checkLoginStatus = async () => {
            const response = await fetch("http://localhost:3001/api/auth/authorize", {
                credentials: "include"
            });
            const data = await response.json();
            if (response.status === 200) {
                setIsLoggedIn(true);
                setEmail(data);
            }
        };

        checkLoginStatus();
    }, []);
    
    useEffect(() => {
        if (isRegistered) {
            setTimeout(() => {
                setIsRegistered(false);
            }, 5000); // Visa meddelandet i 5 sekunder
        }
    }, [isRegistered]);

    const handleRegister = async () => {
        const response = await fetch("http://localhost:3001/api/auth/register", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ email, password })
        });
        const data = await response.json();
        setIsRegistered(true);
        
        setShowForm("none");

        
    };

    const handleLogin = async () => {
        const response = await fetch("http://localhost:3001/api/auth/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            credentials: "include",
            body: JSON.stringify({ email, password })
        });
        const data = await response.json();

        if (response.status === 400) {
            setErrorMessage("Fel email eller lösenord");
            return;
        }

        if (response.status === 200) {
            setIsLoggedIn(true);
            setEmail(data);
        }
    };

    const handleLogout = async () => {
        const response = await fetch("http://localhost:3001/api/auth/logout", {
            method: "POST",
            credentials: "include"
        });
        if (response.status === 200) {
            setIsLoggedIn(false);
            setShowForm("none"); 
            setEmail("");
        }
    };

    return (
        <>
            {!isLoggedIn && showForm === "none" && (
                <> <div className='loginContainer'>
                        
                        <button onClick={() => setShowForm("login")} className='login'>
                            Logga in här
                        </button>
                    </div>
                <div className='startPage'>
                    <div className='registerContainer'>
                        <h6><i>Inte registrerad?</i></h6>
                        <button onClick={() => setShowForm("register")}>
                            Registrera
                        </button>
                    </div>

                   
                </div>
                </>
            )}
    {isRegistered && (
                <p>Registrering slutförd. Vänligen logga in!</p>
            )}

            {showForm === "register" && (
                <>
                <div className='registerForm'>
                    <h2 className='new'>Registrera ny användare</h2>
                    <div className='RegisterNewCustomer'>
                    <input className='email' type="email" placeholder="Email" onChange={(e) => setEmail(e.target.value)} />
                    <input className='password'type="password" placeholder="Lösenord" onChange={(e) => setPassword(e.target.value)} />
                    <button onClick={handleRegister}>Registrera</button>
                    </div>
                </div>
                </>
            )}

            {showForm === "login" && !isLoggedIn && (
                <>
                <div className='loginForm'>
                    <h2>Logga in</h2>
                    <input type="email" placeholder="Email" onChange={(e) => setEmail(e.target.value)} />
                    <input type="password" placeholder="Lösenord" onChange={(e) => setPassword(e.target.value)} />
                    <button onClick={handleLogin}>Logga in</button>
                    <div>
                        {errorMessage}
                    </div>
                </div>
                </>
            )}

            {isLoggedIn && (
                <>
             
                    <div className='loggedInAs'>
                  
                        <p>Inloggad som: <br>
                        </br> {email}</p>
  <img src={Logo2} className='Logo' />
                    <button onClick={handleLogout}>Logga ut</button>
                    </div>   
                  
                    <ProductList />
                
                </>
            )}
        </>
    );
};
