import NavbarComponents from "@/components/navbar";
import FooterPage from "@/components/footerInPage";
import CanTho from "@/components/explore/cities/cantho";

export default function page() {
  return (
    <div className="page-wrapper">
      <NavbarComponents />
      <div className="main">
        <CanTho />
      </div>
      <div className="footer">
        <FooterPage />
      </div>
    </div>
  );
}
