import Authorization from "@/components/authen/authentication";
import EventDetails from "@/components/event-detail/event-detail";


export default function Page({ params }: { params: { sorted: number, calendarId: string } }) {

    return (
        <Authorization>
           
                    <EventDetails sorted={params.sorted} calendarId={params.calendarId} />
               
        </Authorization>
    )
}