
import {PaymentElement} from '@stripe/react-stripe-js';
import React, { useState } from 'react'

function StripeCard(){
    const [success, setSuccess ] = useState(false)
   


//     const handleSubmit = async (e) => {
//         e.preventDefault()
//         const {error, paymentMethod} = await stripe.createPaymentMethod({
//             type: "card",
//             card: elements.getElement(CardElement)
//         })


//     if(!error) {
//         try {
//             const {id} = paymentMethod
//             // const response = await axios.post("http://localhost:4000/payment", {
//             //     amount: 1000,
//             //     id
//             // })

//             // if(response.data.success) {
//             //     console.log("Successful payment")
//             //     setSuccess(true)
//             // }
//             console.log("done")
//             window.location.href="https://www.codecademy.com/"

//         } catch (error) {
//             console.log("Error", error)
//         }
//     } else {
//         console.log(error.message)
//     }
// }
const handleSubmit=(res)=>{
console.log(res,"reffff")
}

return (
    <form style={{minHeight:"500px"}}>
      <PaymentElement sx={{minHeight:"500px"}}/>
      <button onClick={handleSubmit}>Submit</button>
    </form>
  );

}

export default StripeCard;

// import React from 'react';
// import { CardElement, Elements, injectStripe } from 'react-stripe-elements';

// const PaymentForm = ({ stripe }) => {
//   const handleSubmit = async (event) => {
//     event.preventDefault();

//     if (!stripe) {
//       // Stripe.js has not loaded yet. Make sure to disable form submission or show a loading indicator.
//       return;
//     }

//     const { token } = await stripe.createToken();

//     // Handle the token (send it to your server for payment processing)
//   };

//   return (
//     <form onSubmit={handleSubmit}>
//       <label>
//         Card details
//         <CardElement />
//       </label>
//       <button type="submit">Pay</button>
//     </form>
//   );
// };

// export default injectStripe(PaymentForm);


