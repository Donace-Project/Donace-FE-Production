import CalendarPeople from "@/components/calendars-page/manage/calendar-people";


export default function Page({ params }: { params: { id: string } }) {
    return (

        <CalendarPeople id={params.id} />

    )
}