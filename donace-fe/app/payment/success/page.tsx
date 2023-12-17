
import ReturnPaymentURL from "@/components/payment/payment-page";

import { useParams } from 'next/navigation';


export default function Page() {
    const { vnp_OrderType } = useParams() as { vnp_OrderType: string };
    return (
        <>
            <h1>{vnp_OrderType}</h1>
            <ReturnPaymentURL />
        </>
    )
}