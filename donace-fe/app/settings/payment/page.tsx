import NavbarComponents from "@/components/navbar";
import PaymentPage from "@/components/settings-page/payment-page";

export default function Page(){
    return(
        <div className="page-wrapper">
            <NavbarComponents/>
            <div className="main">
                <PaymentPage/>
            </div>
        </div>
    )
}