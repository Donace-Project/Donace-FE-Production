import EventPayment from "@/components/event-detail/event-payment";


export default function Page({ params }: { params: { id: string } }) {
    return (

        <EventPayment id={params.id} />

    )
}