"use client"
import React from "react";
import { Avatar } from "@nextui-org/avatar";
import { Button } from "@nextui-org/button";
import { Input, Textarea } from "@nextui-org/input";
import { Link } from "@nextui-org/link";
import { ArrowUp, UserCheck2, Lock, ShieldCheck } from "lucide-react";

export default function SettingLandingPage() {
    const placements = [
        "outside",
    ];

    const [value, setValue] = React.useState("");

    const validateEmail = (value: any) => value.match(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+.[A-Z]{2,4}$/i);

    const isInvalid = React.useMemo(() => {
        if (value === "") return false;

        return validateEmail(value) ? false : true;
    }, [value]);

    return (
        <div className="page-content">
            <div className="page-header opacity-[1] pt-12 pl-4 pr-4 max-width-global margin-global">
                <div className="spread gap-2 mb-2 flex justify-between items-center">
                    <h1 className="tab-title text-4xl font-semibold mb-0 mt-0">Settings</h1>
                </div>
            </div>
            <div className="tab-wrapper m-auto pt-2">
                <div className="zm-container pt-1 max-width-global margin-global">
                    <div className="page-header-tabs-wrapper flex justify-between items-baseline">
                        <div className="flex max-w-full overflow-auto min-w-0 gap-4 flex-1">
                            <div className="side-padding">&nbsp;</div>
                            <Link href="/settings"
                                className="text-black-light-theme border-b-2 border-solid border-[rgb(19,21,23)] whitespace-nowrap inline-block pb-2 transition-all duration-300 ease-in-out cursor-pointer"
                                underline="none"
                            >
                                Account
                            </Link>
                            <Link href="/preferences"
                                className="text-black-blur-light-theme border-b-2 border-solid border-transparent whitespace-nowrap inline-block pb-2 transition-all duration-300 ease-in-out cursor-pointer"
                                underline="none"
                            >
                                Preferences
                            </Link>
                            <Link href="/payment"
                                className="text-black-blur-light-theme border-b-2 border-solid border-transparent whitespace-nowrap inline-block pb-2 transition-all duration-300 ease-in-out cursor-pointer"
                                underline="none"
                            >
                                Payment
                            </Link>
                            <div className="side-padding pl-0.5"></div>
                        </div>
                    </div>
                </div>
                <div className="border-b border-solid border-[rgba(19,21,23,0.08)] mb-7"></div>
            </div>
            <div className="main-container pl-4 pr-4 max-width-global margin-global">
                <div className="can-divider with-divider medium">
                    <div className="section-title-wrapper medium">
                        <div className="spread mb-5 flex justify-between items-center">
                            <h2 className="text-xl font-semibold text-black-light-theme mb-0 mt-0">Your Profile</h2>
                            <div className="right-element m-[-0.25rem_0]"></div>
                        </div>
                        <div className="-mt-3.5 mb-5 text-[#737577] text-base">Choose how you are displayed as a host or guest.</div>
                    </div>
                    <div className="wrapper flex items-start flex-row-reverse gap-16">
                        <div className="avatar-section flex-1">
                            <label className="text-sm block mb-1.5 font-medium text-black-more-blur-light-theme transition-all duration-300 ease-in-out">
                                <div>Profile Picture</div>
                            </label>
                            <div role="presentation" className="relative w-24 h-24 cursor-pointer">
                                <input accept="image/*,.jpg,.jpeg,.png,.gif,.webp" multiple type="file" tabIndex={-1} className="hidden text-inherit m-0" />
                                <div className="z-20 upload-icon rounded-full bg-center bg-cover flex justify-center items-center text-[#fff] bg-[rgb(19,21,23)] w-[35%] h-[35%] border-2 border-solid border-[#fff] absolute right-0 bottom-0 origin-center transition-all duration-300 ease-in-out">
                                    <ArrowUp className="stroke-2 w-2/3 block align-middle" />
                                </div>
                                <Avatar className="w-24 h-24 bg-center bg-cover flex justify-center items-center bg-[#ebeced]" radius="full" src="https://cdn.lu.ma/cdn-cgi/image/format=auto,fit=cover,dpr=2,quality=75,width=100,height=100/avatars-default/avatar_8.png" />
                            </div>
                        </div>
                        <div className="form w-80 max-w-[320px]">
                            <form action={"#"}>
                                <div>
                                    <div className="lux-input-wrapper max-width-global mb-4">
                                        <div className="inner-wrapper inline-block w-full">
                                            {placements.map((placement) => (
                                                <Input
                                                    key={placement}
                                                    type="text"
                                                    label="Name"
                                                    labelPlacement={"outside"}
                                                    placeholder="Enter your name"
                                                    autoCorrect="off"
                                                    spellCheck="false"
                                                    autoCapitalize="words"
                                                    isInvalid={true}
                                                    variant="faded"
                                                    classNames={{
                                                        inputWrapper: ["bg-[#fff]",
                                                            "text-base",
                                                            "h-auto",
                                                            "w-full",
                                                            "p-[0.625rem_0.875rem]",
                                                        ]
                                                    }}
                                                />
                                            ))}
                                        </div>
                                    </div>
                                    <div className="lux-input-wrapper max-width-global mb-4">
                                        <div className="inner-wrapper inline-block w-full">
                                            {placements.map((placement) => (
                                                <Textarea
                                                    key={placement}
                                                    type="text"
                                                    label="Bio"
                                                    labelPlacement={"outside"}
                                                    placeholder="Share a little about your background and interests."
                                                    autoCorrect="off"
                                                    spellCheck="false"
                                                    autoCapitalize="words"
                                                    variant="faded"
                                                    minRows={2}
                                                    classNames={{
                                                        inputWrapper: ["bg-[#fff]",
                                                            "text-base",
                                                            "h-auto",
                                                            "w-full",
                                                        ]
                                                    }}
                                                />
                                            ))}
                                        </div>
                                    </div>
                                    <div className="mt-6">
                                        <Button className="text-[#fff] bg-[#333537] border-[#333537] border border-solid cursor-pointer transition-all duration-300 ease-in-out donace-button flex items-center m-0">
                                            <UserCheck2 className="mr-2 stroke-2 w-4 h-4 flex-shrink-0 block align-middle" />
                                            <div className="label">Save Changes</div>
                                        </Button>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
                <div className="can-divider with-divider medium mt-8 pt-8 border-t border-solid border-[rgba(19,21,23,0.08)]">
                    <div className="section-title-wrapper medium">
                        <div className="spread mb-5 flex justify-between items-center">
                            <h2 className="text-xl font-semibold text-black-light-theme mb-0 mt-0">Email and Phone</h2>
                            <div className="right-element m-[-0.25rem_0]"></div>
                        </div>
                        <div className="-mt-3.5 mb-5 text-[#737577] text-base">Manage the email and phone you use to sign into Donace and receive notifications.</div>
                    </div>
                    <div className="grid grid-cols-[1fr_1fr] gap-16">
                        <form action={"#"}>
                            <div className="input-wrapper max-width-global flex items-baseline">
                                <div className="lux-input-wrapper max-width-global mr-4 flex-1">
                                    <div className="inner-wrapper inline-block w-full">
                                        {placements.map((placement) => (
                                            <Input
                                                value={value}
                                                isInvalid={isInvalid}
                                                color={isInvalid ? "danger" : "default"}
                                                errorMessage={isInvalid && "Please enter a valid email"}
                                                onValueChange={setValue}
                                                key={placement}
                                                type="email"
                                                label="Email"
                                                labelPlacement={"outside"}
                                                placeholder="Enter your email"
                                                autoCorrect="off"
                                                spellCheck="false"
                                                autoCapitalize="words"
                                                variant="faded"
                                                classNames={{
                                                    inputWrapper: ["bg-[#fff]",
                                                        "text-base",
                                                        "h-auto",
                                                        "w-full",
                                                        "p-[0.625rem_0.875rem]",
                                                    ]
                                                }}
                                            />
                                        ))}
                                    </div>
                                </div>
                                <Button type="submit" className="text-[#fff] bg-[#333537] border-[#333537] border border-solid cursor-pointer transition-all duration-300 ease-in-out donace-button flex items-center m-0 top-[2.35rem]">
                                    <div className="label">Update</div>
                                </Button>
                            </div>
                        </form>
                        <form action={"#"}>
                            <div className="input-wrapper max-width-global flex items-baseline">
                                <div className="lux-input-wrapper max-width-global mr-4 flex-1">
                                    <div className="inner-wrapper inline-block w-full">
                                        {placements.map((placement) => (
                                            <Input
                                                key={placement}
                                                type="tel"
                                                label="Phone Number"
                                                labelPlacement={"outside"}
                                                placeholder="+84 123 456 789"
                                                variant="faded"
                                                classNames={{
                                                    inputWrapper: ["bg-[#fff]",
                                                        "text-base",
                                                        "h-auto",
                                                        "w-full",
                                                        "p-[0.625rem_0.875rem]",
                                                    ]
                                                }}
                                            />
                                        ))}
                                    </div>
                                </div>
                                <Button type="submit" className="text-[#fff] bg-[#333537] border-[#333537] border border-solid cursor-pointer transition-all duration-300 ease-in-out donace-button flex items-center m-0 top-[2.35rem]">
                                    <div className="label">Update</div>
                                </Button>
                            </div>
                        </form>
                    </div>
                    <div className="text-secondary-alpha text-sm text-black-more-blur-light-theme pt-4">
                        For your security, we will send you a code to verify any change to your email or phone number.
                    </div>
                </div>
                <div className="can-divider with-divider medium mt-8 pt-8 border-t border-solid border-[rgba(19,21,23,0.08)]">
                    <div className="section-title-wrapper medium">
                        <div className="spread mb-5 flex justify-between items-center">
                            <h2 className="text-xl font-semibold text-black-light-theme mb-0 mt-0">Password & Security</h2>
                            <div className="right-element m-[-0.25rem_0]"></div>
                        </div>
                        <div className="-mt-3.5 mb-5 text-[#737577] text-base">Secure your account with password and two-factor authentication.</div>
                    </div>
                    <div className="content-card p-[0.875rem_1rem] relative rounded-xl bg-[#f3f4f5] border border-solid border-[#f3f4f5] overflow-hidden">
                        <div className="spread gap-2 flex justify-between items-center">
                            <div className="left gap-3 flex items-baseline">
                                <div className="icon translate-y-0.5">
                                    <Lock className="block w-4 h-4 align-middle" />
                                </div>
                                <div className="content">
                                    <div className="font-medium">Account Password</div>
                                    <div className="desc mt-px text-sm text-black-more-blur-light-theme">Please follow the instructions in the email to finish setting your password.</div>
                                </div>
                            </div>
                            <div className="right">
                                <Button type="button" className="text-[#fff] bg-[#333537] border-[#333537] border border-solid cursor-pointer transition-all duration-300 ease-in-out donace-button flex items-center m-0">
                                    <div className="label">Set Password</div>
                                </Button>
                            </div>
                        </div>
                        <hr className="margin-hr" />
                        <div className="spread gap-2 flex justify-between items-center">
                            <div className="left gap-3 flex items-baseline">
                                <div className="icon translate-y-0.5">
                                    <ShieldCheck className="block w-4 h-4 align-middle" />
                                </div>
                                <div className="content">
                                    <div className="font-medium">Two-Factor Authentication</div>
                                    <div className="desc mt-px text-sm text-black-more-blur-light-theme">Please set a password before enabling two-factor authentication.</div>
                                </div>
                            </div>
                            <div className="right">
                                <Button type="button" className="text-[#fff] bg-[#333537] border-[#333537] border border-solid cursor-pointer transition-all duration-300 ease-in-out donace-button flex items-center m-0">
                                    <div className="label">Enable 2FA</div>
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="can-divider with-divider medium mt-8 pt-8 border-t border-solid border-[rgba(19,21,23,0.08)]">
                    <div className="section-title-wrapper medium">
                        <div className="spread mb-5 flex justify-between items-center">
                            <h2 className="text-xl font-semibold text-black-light-theme mb-0 mt-0">Third Party Accounts</h2>
                            <div className="right-element m-[-0.25rem_0]"></div>
                        </div>
                        <div className="-mt-3.5 mb-5 text-[#737577] text-base">Link your accounts to sign into Donace and automate your workflows.</div>
                    </div>
                </div>
                <div className="can-divider with-divider medium mt-8 pt-8 border-t border-solid border-[rgba(19,21,23,0.08)]"></div>
                <div className="can-divider with-divider medium mt-8 pt-8 border-t border-solid border-[rgba(19,21,23,0.08)]"></div>
            </div>
        </div>
    )
}