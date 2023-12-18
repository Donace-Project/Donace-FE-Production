import CalendarManage from "@/components/calendars-page/manage/calendar-manage";

export default function Page({ params }: { params: { id: string } }) {
    return (
        <CalendarManage id={params.id} />
    )
}