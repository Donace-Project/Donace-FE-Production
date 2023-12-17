import CalendarSettingOptions from "@/components/calendars-page/manage/calendar-options";


export default function Page({ params }: { params: { id: string } }) {
    return (

        <CalendarSettingOptions id={params.id} />
    )
}