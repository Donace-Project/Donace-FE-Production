import NavbarComponents from "@/components/navbar";
import FooterPage from "@/components/footerInPage";
import HoChiMinh from "@/components/explore/cities/hochiminh";

export default function page() {
  return (
    <div className="page-wrapper">
      <NavbarComponents />
      <div className="main">
        <HoChiMinh />
      </div>
      <div className="footer">
        <FooterPage />
      </div>
    </div>
  );
}
