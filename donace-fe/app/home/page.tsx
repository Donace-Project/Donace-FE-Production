import HomeEvents from "@/components/home/home";
import NavbarComponents from "@/components/navbar";
import Authorization from "@/components/authen/authentication";

export default function HomePage() {


    return (
        <Authorization >
            <HomeEvents />
        </Authorization>
    )
}