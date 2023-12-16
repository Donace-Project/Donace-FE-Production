import CreateCalendar from "@/components/calendars-page/create-calendar";
import NavbarComponents from "@/components/navbar";
import Authorization from "@/components/authen/authentication";

export default function Page({ params }: { params: { id: string } }) {

    return (
        <Authorization>

            <div className="page-wrapper">
                <NavbarComponents />
                <div className="main">
                    <CreateCalendar id={params.id} />
                </div>
            </div>
        </Authorization>
    )
}