import HomeEvents from "@/components/home/home";
import NavbarComponents from "@/components/navbar";
export default function HomePage() {
    return (
        <div className="page-wrapper">
            <div className="">
                <div>
                    {/* <NavbarComponents /> */}
                </div>
                <div>

                    <HomeEvents />
                </div>
            </div>
        </div>
    )
}