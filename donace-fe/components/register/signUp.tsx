"use client";
import "@/styles/globals.css";
import React from "react";
import { Button } from "@nextui-org/button";
import { Card, CardHeader, CardBody, CardFooter } from "@nextui-org/card";
import { Input } from "@nextui-org/input";
import { Link } from "@nextui-org/link";
import { ArrowLeft, DoorOpen, UserCircle2, UserPlus } from "lucide-react";
import { Divider } from "@nextui-org/divider";
import { Checkbox } from "@nextui-org/checkbox";

export default function SignUp() {
    const [isVisible, setIsVisible] = React.useState(false);

    const [email, setEmail] = React.useState("");
    const [password, setPassword] = React.useState("");

    const validateEmail = (value: string) =>
        value.match(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+.[A-Z]{2,4}$/i);

    const isInvalidEmail = React.useMemo(() => {
        if (email === "") return false;

        return validateEmail(email) ? false : true;
    }, [email]);

    return (
        <div className="onboarding-page">
            <Card className="opacity-[1] relative flex-1 p-6 bg-[rgba(255,255,255,0.8)] backdrop-blur-lg max-w-sm rounded-2xl h-fit">
                <div className="relative h-[480px]">
                    <div className="animated-container absolute top-0 w-full">
                        <CardHeader className="opacity-[1] transform-none">
                            <div className="icon relative w-16 h-16 flex items-center justify-center bg-[rgba(19,21,23,0.04)] rounded-full">
                                <UserPlus className="w-8 h-8 text-[#939597] block align-middle ml-1" />
                            </div>
                        </CardHeader>
                        <CardBody className="opacity-[1] transform-none">
                            <div className="gap-2 pt-1 mb-4 flex flex-col">
                                <h1 className="font-semibold text-2xl mb-0 mt-0 leading-5">
                                    Sign Up to Donace
                                </h1>
                                <div className="text-secondary pt-0.5 pb-1 text-sm text-black-more-blur-light-theme">
                                    Create for your new account.
                                </div>
                            </div>
                            <div>
                                <Input
                                    value={email}
                                    type="email"
                                    label="Email"
                                    isInvalid={isInvalidEmail}
                                    color={isInvalidEmail ? "danger" : "success"}
                                    errorMessage={isInvalidEmail && "Please enter a valid email"}
                                    onValueChange={setEmail}
                                    isRequired
                                    isClearable
                                    placeholder="your@email.com"
                                    className="text-base h-auto transition-all duration-300 leading-4 rounded-lg w-full m-0"
                                />
                                <Input
                                    label="Password"
                                    value={password}
                                    onValueChange={setPassword}
                                    isRequired
                                    labelPlacement={"inside"}
                                    placeholder="your secret password"
                                    className="pt-2 text-base h-auto transition-all duration-300 leading-4 rounded-lg w-full m- mb-6"
                                    type={isVisible ? "text" : "password"}
                                />
                                <Button
                                    type="button"
                                    className="mb-12 text-[#fff] bg-[#333537] border-[#333537] border border-solid w-full cursor-pointer transition-all duration-300 ease-in-out font-medium rounded-lg relative whitespace-nowrap justify-center outline-none max-w-full text-base p-[0.625rem_0.875rem] h-[calc(2.25rem+2*1px)] flex items-center m-0 leading-6"
                                >
                                    <div className="label">Sign Up</div>
                                </Button>
                            </div>
                        </CardBody>
                        <Divider />
                        <CardFooter className="-mb-2 flex justify-center items-center">
                            <div className="">Already have an account?</div>
                            <div>&nbsp;</div>
                            <Link href="/auth/login" underline="hover">
                                Sign In.
                            </Link>
                            {/* <Button type="button"
                                as={Link}
                                href="/auth/register"
                                className="border-[#939597] bg-[rgba(19,21,23,0.04)] w-full cursor-pointer transition-all duration-300 ease-in-out font-medium rounded-lg relative whitespace-nowrap justify-center outline-none max-w-full text-base p-[0.625rem_0.875rem] h-[calc(2.25rem+2*1px)] flex items-center m-0 leading-6"
                            >
                                <div className="label">Turn back to Login</div>
                            </Button> */}
                        </CardFooter>
                    </div>
                </div>
            </Card>
        </div>
    )
}