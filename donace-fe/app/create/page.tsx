"use client"
import CreateFormFinal from "@/components/form/create-event-form";
import NavbarComponents from "@/components/navbar";

function CreatePage() {
    return (
        <div className="page-wrapper">
            <NavbarComponents />
            <div className="main">
                <CreateFormFinal />
            </div>
        </div>)
}

export default CreatePage;