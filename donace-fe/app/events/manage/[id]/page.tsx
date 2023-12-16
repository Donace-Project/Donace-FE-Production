import EventManage from "@/components/event-detail/event-manage";
import NavbarComponents from "@/components/navbar";
import Authorization from "@/components/authen/authentication";
import { useSession } from "next-auth/react";

export default function Page({ params }: { params: { id: string } }) {
    const { data: session } = useSession();
    if (!session) {
        // Nếu người dùng chưa xác thực, điều hướng về trang đăng nhập
        return (
            <Authorization />
        );
    }

    return (
        <div className="page-wrapper">
            <NavbarComponents />
            <div className="main">
                <EventManage id={params.id} />
            </div>
        </div>
    )
}