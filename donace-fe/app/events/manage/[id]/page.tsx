import EventManage from "@/components/event-detail/event-manage";

import Authorization from "@/components/authen/authentication";

export default function Page({ params }: { params: { id: string } }) {

    return (
        <Authorization>
           
                    <EventManage id={params.id} />
              
        </Authorization>
    )
}