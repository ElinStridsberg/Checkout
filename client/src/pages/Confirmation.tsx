import { useEffect, useState } from "react";

export const Confirmation = () => {
    const [verified, setVerified] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        const verifySession = async () => {
            let sessionId;
            const dataFromLs = localStorage.getItem("sessionId");

            if (dataFromLs) {
                sessionId = JSON.parse(dataFromLs);
            }

            try {
                const response = await fetch("http://localhost:3001/payments/verify-session", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({ sessionId })
                });

                const data = await response.json();

                if (response.ok) {
                    setVerified(data.verified);
                    setIsLoading(false);
                } else {
                    setError("Misslyckades med att verifiera sessionen.");
                    setIsLoading(false);
                }
            } catch (err) {
                console.error("Fel vid verifiering av sessionen:", err);
                setError("Ett error uppkom vid verifiering av sessionen");
                setIsLoading(false);
            }
        };

        if (!verified) {
            verifySession();
        }
    }, [verified]);

    if (isLoading) {
        return <h3>Laddar...</h3>;
    }

    if (error) {
        return <h3>{error}</h3>;
    }

    return (
        <div>
            <h3>{verified ? "TACK FÖR DITT KÖP ✅" : "Kunde inte slutföra betalningen."}</h3>
        </div>
    );
};
