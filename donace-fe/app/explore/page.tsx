import NavbarComponents from "@/components/navbar";
import FooterPage from "@/components/footerInPage";
import ExploreEdit from "@/components/explore/explore";

export default function Page() {
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
