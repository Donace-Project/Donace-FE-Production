import NavbarComponents from "@/components/navbar";
import FooterPage from "@/components/footerInPage";
import Explore from "@/components/explore/explore";

export default function ExploreEdit() {
  return (
    <div className="page-wrapper">
      <NavbarComponents />
      <div className="main">
        <ExploreEdit />
      </div>
      <div className="footer">
        <FooterPage />
      </div>
    </div>
  );
}
