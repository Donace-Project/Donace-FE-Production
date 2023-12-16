"use client";
import FooterPage from "@/components/footerInPage";
import NavbarComponents from "@/components/navbar";
import { useSession } from "next-auth/react";
import { usePathname } from "next/navigation";


interface AuthorizationProps {
    children?: React.ReactNode;
}

export default function Authorization({ children }: AuthorizationProps) {
    const currentDomain = process.browser ? window.location.origin : `${process.env.NEXTAUTH_URL || 'http://localhost:3000'}`;

    let href = `${currentDomain}/auth/login?callbackUrl=${currentDomain + usePathname()}`;
    const { data: session } = useSession();
    if (session) {
        // Nếu người dùng chưa xác thực, điều hướng về trang đăng nhập
        return (
            <>
                {children}
            </>
        );
    } else {
        return (
            <div className="page-wrapper">
                <NavbarComponents />
                <div className="main">
                    <div className="flex flex-col items-center justify-center h-screen">
                        <div className="text-3xl text-gray-700 dark:text-gray-200 font-bold mb-5">
                            Bạn chưa đăng nhập
                        </div>
                        <div className="text-xl text-gray-600 dark:text-gray-300 mb-8 text-center">
                            Vui lòng đăng nhập để tiếp tục
                        </div>
                        <a
                            href={href}
                            className="bg-[#333537] dark:bg-[#fff] text-[#fff] dark:text-[rgb(19,21,23)] py-3 px-8 rounded-lg hover:bg-gray-700 dark:hover:bg-[#fff] transition-all duration-300 ease-in-out"
                        >
                            Đăng nhập
                        </a>
                    </div>
                </div>
                <div className="footer">
                    <FooterPage />``
                </div>
            </div>
        )
    }

}
