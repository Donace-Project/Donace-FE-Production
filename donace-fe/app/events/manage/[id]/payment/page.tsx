import EventPayment from "@/components/event-detail/event-payment";
import NavbarComponents from "@/components/navbar";

export default function Page({ params }: { params: { id: string } }) {
    return (
        <div className="page-wrapper">
            <NavbarComponents />
            <div className="main">
                <EventPayment id={params.id} />
            </div>
        </div>
    )
}