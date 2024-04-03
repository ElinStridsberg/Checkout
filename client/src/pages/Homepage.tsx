import { useEffect, useState } from "react"

export const Homepage = () => {
    const [customer, setCustomer] = useState<string>("")

    useEffect(() => {
        const authorize = async () => {
            const response = await fetch("http://localhost:3001/api/auth/authorize", {
                credentials: "include"
     
             }) 
             const data = await response.json()
             if (response.status === 200) {
                setCustomer(data)
             } else {
                setCustomer("")
             }
        }
        authorize()
    }, [])
    const register = async() => {
        const response = await fetch("http://localhost:3001/api/auth/register", {
           method:  "POST",
           headers: {
            "Content-Type" : "application/json"
           },
           body: JSON.stringify({email: "abc.com@jdw", password: "56789"})
        }) 

        const data = await response.json()
        console.log(data)
    }
       // vi gör en knapp til vår funktion. Den gör ett anrop till vår server och skickar med data.
    
    const login = async () => {
        const response = await fetch("http://localhost:3001/api/auth/login", {
            method:  "POST",
            headers: {
             "Content-Type" : "application/json"
            },
            credentials: "include",
            body: JSON.stringify({email: "abc.com@jdw", password: "56789"})
           
         }) 
         const data = await response.json()
         if (response.status === 200) {
            setCustomer(data)
         } else {
            setCustomer("")
         }
     }
    const logout = async () => {
    const response = await fetch("http://localhost:3001/api/auth/logout", {
           method:  "POST",
            credentials: "include"          
        }) 

        if( response.status === 200) {
            setCustomer("")
        }
    }
       return (
        <>       
            <h1>{customer ? "inloggad som: " + customer : "Utloggad"}</h1>
         
            <button onClick={register}> Registrera </button>
            <button onClick={login}> Logga in </button>
            <button onClick={logout}> Logga ut </button>
     
        {/* <div className="homeContainer">
                <h1>HomePage</h1>
            <div className="buttonContainer">
            <Link to="/login">
                <button>Login</button>
            </Link>
            <Link to="/register">
                <button>Register</button>
            </Link>
           </div> 
        </div> */}
        </>
    )
}