
import ReturnPaymentURL from "@/components/payment/payment-page";



export default function Page({ params }: { params: { part: string, order: string, user: string } }) {
    return (
        <ReturnPaymentURL partId={params.part} orderId={params.order} userId={params.user} />
    )
}