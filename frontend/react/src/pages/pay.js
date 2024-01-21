import { Grid } from "@mui/material";
import {Elements} from '@stripe/react-stripe-js';
import {loadStripe} from '@stripe/stripe-js';
import StripeCard from "../components/stripeCard";
const stripePromise = loadStripe('pk_test_51JmASESJeDTHZ17rRTItK4Y1dsv9riiknmvKc3vhCUhbsEL2NT0XR0RGWa95oB4xkTOKlWYLDvbMkXXw2eKFtoiD00pFoLqPLh');
function Pay(){
    const options = {
        // passing the client secret obtained from the Stripe Dashboard
        clientSecret: 'pi_1FpUmEKZaRsxp2y4c9OPoTjM_secret_tv9tsgAQbAlNRYqm8MAzmYPuE'
      };
return(
   <>
                  
            <Elements stripe={stripePromise} options={options}>
           <StripeCard />
         </Elements>
        
         </>
)
}
export default Pay;