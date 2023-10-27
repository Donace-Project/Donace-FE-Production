import { Link } from "@nextui-org/link";
import { FileCode2, Github, GraduationCap, Mail } from "lucide-react";

export default function FooterPage() {
    return (
        <footer className="global-footer">
            <div className="zm-container pt-16 text-sm text-black-blur-light-theme max-width-global margin-global">
                <div className="global-footer-content dark:border-[rgba(255,255,255,0.08)] flex items-start">
                    <div className="left-wrapper flex-wrap flex-1 flex items-center">
                        <Link href="/" aria-label="Donace Home" className="ml-[-0.5rem] pr-3 mt-0.5 pt-4 text-black-blur-light-theme dark:text-[hsla(0,0%,100%,.5)] transition-all duration-300 ease-in-out p-2 flex items-center cursor-pointer" underline="none">
                            <GraduationCap className="w-4 h-4 block align-middle" />
                        </Link>
                        <div className="links">
                            <Link href="" className="text-black-blur-light-theme dark:text-[hsla(0,0%,100%,.5)] transition-all duration-300 ease-in-out p-2 inline-block cursor-pointer" underline="none">What’s New</Link>
                            <Link href="/explore" className="text-black-blur-light-theme dark:text-[hsla(0,0%,100%,.5)] transition-all duration-300 ease-in-out p-2 inline-block cursor-pointer" underline="none">Explore</Link>
                        </div>
                    </div>
                    <div className="icon whitespace-nowrap m-[0px_-0.625rem] flex items-center">
                        <Link href="mailto:dattranphu1114@gmail.com" className="p-2.5 text-black-blur-light-theme dark:text-[hsla(0,0%,100%,.5)] transition-all duration-300 ease-in-out flex items-center cursor-pointer" underline="none">
                            <Mail className="w-4 h-4 block align-middle" />
                        </Link>
                        <Link href="https://github.com/Donace-Project" target="_blank" className="p-2.5 text-black-blur-light-theme dark:text-[hsla(0,0%,100%,.5)] transition-all duration-300 ease-in-out flex items-center cursor-pointer" underline="none">
                            <Github className="w-4 h-4 block align-middle" />
                        </Link>
                        <Link href="https://www.notion.so/Donace-T-ng-quan-29499fa07cac4c098c0bf42cff887173" target="_blank" className="p-2.5 text-black-blur-light-theme dark:text-[hsla(0,0%,100%,.5)] transition-all duration-300 ease-in-out flex items-center cursor-pointer" underline="none">
                            <FileCode2 className="w-4 h-4 block align-middle" />
                        </Link>
                    </div>
                </div>
            </div>
        </footer>
    )
}