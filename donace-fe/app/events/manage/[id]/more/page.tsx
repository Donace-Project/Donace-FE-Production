import EventMore from "@/components/event-detail/event-more";
import NavbarComponents from "@/components/navbar";

export default function Page({ params }: { params: { id: string } }) {
    return (
      
                <EventMore id={params.id} />
           
    )
}