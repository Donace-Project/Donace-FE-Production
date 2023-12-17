import EventRevenue from "@/components/event-detail/event-revenue";


export default function Page({ params }: { params: { id: string } }) {
    return (
     
                <EventRevenue id={params.id} />
        
    )
}