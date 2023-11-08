"use client"
import CreateForm from "@/components/form/create-form";
import NavbarComponents from "@/components/navbar";
export const createPage = () => {
    return (
        <>
            <div className="page-wrapper">
                <NavbarComponents />
                <div className="main">
                    <CreateForm />
                </div>
            </div>
        </>)
}

export default createPage;