import CalendarPage from "@/components/calendars-page/calendars-page";

import Authorization from "@/components/authen/authentication";

export default function Page() {
    return (
        <Authorization>

            <CalendarPage />

        </Authorization>
    )
}