
import ReturnPaymentURL from "@/components/returnPayment/payment-page";
import Authorization from "@/components/authen/authentication";

export default function Page() {

    return (
        <Authorization>
         
                    <ReturnPaymentURL />
                
        </Authorization>
    )
}