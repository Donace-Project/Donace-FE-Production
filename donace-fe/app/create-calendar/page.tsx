import CreateCalendar from "@/components/calendars-page/create-calendar";
import NavbarComponents from "@/components/navbar";

export default function Page({ params }: { params: { id: string } }) {
    return (
        <div className="page-wrapper">
            <NavbarComponents/>
            <div className="main">
                <CreateCalendar id={params.id}/>
            </div>
        </div>
    )
}