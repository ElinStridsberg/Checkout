export const Payment = () => {

    const checkoutItem = JSON.parse(localStorage.getItem("cart") || "[]");

    const handlePayment = async () => {
       const response = await fetch ("http://localhost:3001/payments/create-checkout-session", {
           method: "POST",
           credentials: "include",
           headers: {
               "Content-Type": "application/json"
           },

           body: JSON.stringify(checkoutItem
           )
       })
       const data = await response.json()
       localStorage.setItem("sessionId", JSON.stringify(data.sessionId))
       window.location = data.url
   }

   return (
       <>
       <button onClick={handlePayment} className="pay">Gå till kassan</button>
       
       </>
   )
}