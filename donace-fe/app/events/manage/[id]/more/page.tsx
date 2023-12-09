import EventMore from "@/components/event-detail/event-more";
import NavbarComponents from "@/components/navbar";

export default function Page({ params }: { params: { id: string } }) {
    return (
        <div className="page-wrapper">
            <NavbarComponents />
            <div className="main">
                <EventMore id={params.id} />
            </div>
        </div>
    )
}