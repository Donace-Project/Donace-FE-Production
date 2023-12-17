
import CreateFormFinal from "@/components/form/create-event-form";

import Authorization from "@/components/authen/authentication";


function CreatePage() {


    // Nếu đã xác thực, hiển thị nội dung bảo vệ
    return (
        <Authorization>

            <CreateFormFinal />

        </Authorization>
    )
}

export default CreatePage;