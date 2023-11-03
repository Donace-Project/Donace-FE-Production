import NavbarComponents from "@/components/navbar";
import FooterPage from "@/components/footerInPage";
import ExploreDetail from "@/components/explore-detail/explore-detail";

export default function page() {
  return (
    <div className="page-wrapper">
      <NavbarComponents />
      <div className="main">
        <ExploreDetail />
      </div>
      <div className="footer">
        <FooterPage />
      </div>
    </div>
  );
}
