import React, { useState } from 'react';

export const Homepage = () => {
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [isRegistered, setIsRegistered] = useState<boolean>(false);
    const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);

    const handleRegister = async () => {
        const response = await fetch("http://localhost:3001/api/auth/register", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ email, password })
        });
        const data = await response.json();
        console.log(data);
        setIsRegistered(true);
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
        console.log(data);
        if (response.status === 200) {
            setIsLoggedIn(true);
        }
    };

    const handleLogout = async () => {
        const response = await fetch("http://localhost:3001/api/auth/logout", {
            method: "POST",
            credentials: "include"
        });
        if (response.status === 200) {
            setIsLoggedIn(false);
        }
    };

    return (
        <>
            {!isLoggedIn && (
                <>
                    <button onClick={() => setIsRegistered(true)}>Registrera</button>
                    <button onClick={() => setIsRegistered(false)}>Logga in</button>

                    {!isRegistered ? (
                        <>
                            <h2>Logga in</h2>
                            <input type="email" placeholder="Email" onChange={(e) => setEmail(e.target.value)} />
                            <input type="password" placeholder="Lösenord" onChange={(e) => setPassword(e.target.value)} />
                            <button onClick={handleLogin}>Logga in</button>
                        </>
                    ) : (
                        <>
                            <h2>Registrera</h2>
                            <input type="email" placeholder="Email" onChange={(e) => setEmail(e.target.value)} />
                            <input type="password" placeholder="Lösenord" onChange={(e) => setPassword(e.target.value)} />
                            <button onClick={handleRegister}>Registrera</button>
                        </>
                    )}
                </>
            )}

            {isLoggedIn && (
                <>
                    <h1>Inloggad som: {email}</h1>
                    <button onClick={handleLogout}>Logga ut</button>
                </>
            )}
        </>
    );
};
