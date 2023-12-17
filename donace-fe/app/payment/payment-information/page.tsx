import Authentication from "@/components/authen/authentication";
import PaymentInfor from "@/components/payment/payment-information";
import { useRouter } from 'next/router';
export default function Page() {

    return (
        <Authentication>
            <PaymentInfor ticketId="1" />
        </Authentication>
    )
}