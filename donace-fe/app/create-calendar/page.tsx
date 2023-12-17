import CreateCalendar from "@/components/calendars-page/create-calendar";

import Authorization from "@/components/authen/authentication";

export default function Page({ params }: { params: { id: string } }) {

    return (
        <Authorization>

            <CreateCalendar id={params.id} />

        </Authorization>
    )
}