import CalendarSetting from "@/components/calendars-page/manage/calendar-display";

export default function Page({ params }: { params: { id: string } }) {
    return (

        <CalendarSetting id={params.id} />

    )
}