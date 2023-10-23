import { Button } from "@nextui-org/button";

export default function HomeEvents() {
    return (
        <div className="page-content">
            <div className="page-header opacity-[1] pt-12 pl-[1rem!important] pr-[1rem!important] max-w-4xl m-[0_auto]">
                <div className="spread gap-2 mb-[.5rem!important] flex justify-between items-center">
                    <h1 className="tab-title text-4xl font-semibold mb-0 mt-0">Events</h1>
                    <div className="lux-button min-w-[auto] p-0.5 overflow-hidden rounded-lg">
                        <div className="seggments grid grid-cols-1 relative">
                            <Button className="text-[#fff] text-xs p-[0.25rem_0.5rem] relative rounded-none justify-center cursor-pointer transition-global font-medium flex items-center m-0 bg-transparent border border-solid leading-6">
                                <div>Upcoming</div>
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}