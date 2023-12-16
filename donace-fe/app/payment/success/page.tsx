import FooterPage from "@/components/footerInPage";
import NavbarComponents from "@/components/navbar";
import ReturnPaymentURL from "@/components/returnPayment/payment-page";
import Authorization from "@/components/authen/authentication";

export default function Page() {

    return (
        <Authorization>
            <div className="page-wrapper">
                <NavbarComponents />
                <div className="main">
                    <ReturnPaymentURL />
                </div>
                <div className="footer">
                    <FooterPage />
                </div>
            </div>
        </Authorization>
    )
}