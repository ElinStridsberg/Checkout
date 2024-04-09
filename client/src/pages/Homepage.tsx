import React, { useEffect, useState } from 'react';
import { Payment } from './Payment';
import ProductList from './ProductList';
import Header from './Header';

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
            setErrorMessage("Wrong email or password");
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
            setShowForm("none"); // Återställer till ursprungliga värden
            setEmail("");
        }
    };

    return (
        <>
            {!isLoggedIn && showForm === "none" && (
                <>
                <div className='startPage'>
                    <div className='registerContainer'>
                        <h3>Ny kund? </h3>
                        <button onClick={() => setShowForm("register")}>
                            Registrera
                        </button>
                    </div>

                    <div className='loginContainer'>
                        <h3>Redan användare? Logga in här!</h3>
                        <button onClick={() => setShowForm("login")}>
                            Logga in
                        </button>
                    </div>
                </div>
                </>
            )}

            {showForm === "register" && (
                <>
                <div className='registerForm'>
                    <h2>Registrera ny användare</h2>
                    <input type="email" placeholder="Email" onChange={(e) => setEmail(e.target.value)} />
                    <input type="password" placeholder="Lösenord" onChange={(e) => setPassword(e.target.value)} />
                    <button onClick={handleRegister}>Registrera</button>
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
                        <p><b>Inloggad som:</b> {email}</p>

                    <button onClick={handleLogout}>Logga ut</button>
                    </div>   
                  
                    <ProductList />
                
                </>
            )}
        </>
    );
};
