import EventRevenue from "@/components/event-detail/event-revenue";
import NavbarComponents from "@/components/navbar";

export default function Page({ params }: { params: { id: string } }) {
    return (
        <div className="page-wrapper">
            <NavbarComponents />
            <div className="main">
                <EventRevenue id={params.id} />
            </div>
        </div>
    )
}