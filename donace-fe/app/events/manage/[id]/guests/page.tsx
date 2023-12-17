import EventUserJoin from "@/components/event-detail/event-join";


export default function Page({ params }: { params: { id: string } }) {
    return (

        <EventUserJoin id={params.id} />

    )
}