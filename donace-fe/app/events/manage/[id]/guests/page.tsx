import EventUserJoin from "@/components/event-detail/event-join";
import NavbarComponents from "@/components/navbar";

export default function Page({ params }: { params: { id: string } }){
    return(
        <div className="page-wrapper">
            <NavbarComponents/>
            <div className="main">
                <EventUserJoin id={params.id}/>
            </div>
        </div>
    )
}