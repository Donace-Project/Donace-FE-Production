import FooterPage from "@/components/footerInPage";
import NavbarComponents from "@/components/navbar";
import ReturnPaymentURL from "@/components/returnPayment/payment-page";

export default function Page() {
    return (
        <div className="page-wrapper">
            <NavbarComponents />
            <div className="main">
                <ReturnPaymentURL />
            </div>
            <div className="footer">
                <FooterPage />
            </div>
        </div>
    )
}