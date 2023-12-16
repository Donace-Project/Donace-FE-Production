"use client"
import FooterPage from "@/components/footerInPage";
import CreateFormFinal from "@/components/form/create-event-form";
import NavbarComponents from "@/components/navbar";
import Authorization from "@/components/author/authorization";


function CreatePage() {


    // Nếu đã xác thực, hiển thị nội dung bảo vệ
    return (
        <Authorization>

            <div className="page-wrapper">
                <NavbarComponents />
                <div className="main">
                    <CreateFormFinal />
                </div>
                <div className="footer">
                    <FooterPage />
                </div>
            </div>);
        </Authorization>
    )
}

export default CreatePage;