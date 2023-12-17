
import JoinEvent from "@/components/user/user-join-event/joinEvent";

export default function Page({ params }: { params: { id: string } }) {
    return (

        <JoinEvent id={params.id} />

    )
}