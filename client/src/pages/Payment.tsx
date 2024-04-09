export const Payment = () => {

    const handlePayment = async () => {
        const response = await fetch ("http://localhost:3001/payments/create-checkout-session", {
            method: "POST",
            credentials: "include",
            headers: {
                "Content-Type": "application/json"
            },

//här skicka in vår kundvagn. Data från vår kundvagn ska skickas till vår backend. Ex en lista på cartitems . Här kan man ha ett object {} med ex id, namn osv
            body: JSON.stringify([
                {
                    product: "price_1P1mEXP1cUqUxBHTSo0Iug8N",
                    quantity: 1
                },
                {
                    product: "price_1P1m7KP1cUqUxBHT8MBE8J4X",
                    quantity: 1
                }
            ])
        })
        const data = await response.json()
        window.location = data.url
    }

    return (
        <>
        <button onClick={handlePayment} className="pay">Gå till kassan</button>
        
        </>
    )
}