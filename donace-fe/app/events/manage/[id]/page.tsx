import EventManage from "@/components/event-detail/event-manage";
import NavbarComponents from "@/components/navbar";

export default function Page({ params }: { params: { id: string } }) {
    return (
        <div className="page-wrapper">
            <NavbarComponents />
            <div className="main">
                <EventManage id={params.id} />
            </div>
        </div>
    )
}