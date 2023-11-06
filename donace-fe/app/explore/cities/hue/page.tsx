import NavbarComponents from "@/components/navbar";
import FooterPage from "@/components/footerInPage";
import Hue from "@/components/explore/cities/hue";

export default function page() {
  return (
    <div className="page-wrapper">
      <NavbarComponents />
      <div className="main">
        <Hue />
      </div>
      <div className="footer">
        <FooterPage />
      </div>
    </div>
  );
}
