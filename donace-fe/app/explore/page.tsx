import NavbarComponents from "@/components/navbar";
import FooterPage from "@/components/footerInPage";
import Explore from "@/components/explore/explore";

export default function Page() {
  return (
    <div className="page-wrapper">
      <NavbarComponents />
      <div className="main">
        <Explore />
      </div>
      <div className="footer">
        <FooterPage />
      </div>
    </div>
  );
}
