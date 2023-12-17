interface PaymentInforProps {
    ticketId: string;
}
export default function PaymentInfor({ ticketId }: PaymentInforProps) {
    return (
        <>
            id: {ticketId}

        </>
    )
}