import { createPaymentStripe} from '../service/payments.service.js'
 
export const createdPayment = async (req,res) => {
    try {
        console.log("hello");
        const payment = await createPaymentStripe();
        console.log(payment, "payment");
        res.json({message: "payment", payload: payment})
    } catch (error) {
        res.json({message: error})
    }
}