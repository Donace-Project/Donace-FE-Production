"use client";
import "@/styles/globals.css";
import React, { useEffect, useState } from "react";
import { Button } from "@nextui-org/button";
import { Card, CardHeader, CardBody, CardFooter } from "@nextui-org/card";
import { Input } from "@nextui-org/input";
import { ArrowLeft, DoorOpen, Smartphone } from "lucide-react";
import { FaGoogle } from "react-icons/fa";
import { Link } from "@nextui-org/link";
import PropTypes from 'prop-types';
import axios from "axios";
import {signIn, signOut} from "next-auth/react";

export default function SignIn() {
    // const [username, setUserName] = useState<string>('');
    // const [password, setPassword] = useState<string>('');
    // const handleSubmit = async (e: React.FormEvent) => {
    //     e.preventDefault();
    //     const token = await loginUser({
    //         username,
    //         password
    //     });
    //     setToken(token);
    // }

    const placements = [
        "inside"
    ];
    const [isVisible, setIsVisible] = React.useState(false);

    const [value, setValue] = React.useState("");

    const validateEmail = (value: string) => value.match(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+.[A-Z]{2,4}$/i);

    const isInvalid = React.useMemo(() => {
        if (value === "") return false;

        return validateEmail(value) ? false : true;
    }, [value]);

    return (
        <div className="onboarding-page">
            <Card className="opacity-[1] relative flex-1 p-6 bg-[rgba(255,255,255,0.8)] backdrop-blur-lg max-w-sm rounded-2xl h-fit">
                <div className="relative h-[490px]">
                    <div className="animated-container absolute top-0 w-full">
                        <CardHeader className="opacity-[1] transform-none">
                            <div className="icon relative w-16 h-16 flex items-center justify-center bg-[rgba(19,21,23,0.04)] rounded-full">
                                <DoorOpen className="w-8 h-8 text-[#939597] block align-middle" />
                                <ArrowLeft className="top-6 right-2.5 absolute text-[#939597] block w-4 h-4 align-middle" />
                            </div>
                        </CardHeader>
                        <CardBody className="opacity-[1] transform-none">
                            <div className="gap-2 pt-1 mb-4 flex flex-col">
                                <h1 className="font-semibold text-2xl mb-0 mt-0 leading-5">Welcome to Donace</h1>
                                <div className="text-secondary pt-0.5 pb-1 text-sm text-black-more-blur-light-theme">Please sign in or sign up below.</div>
                            </div>
                            <div>
                                <form action={"#"}
                                    // onSubmit={handleSubmit}
                                >
                                    <div className="spread flex justify-end items-center">
                                        <Button className="text-black-blur-light-theme bg-transparent p-0 h-auto border-none outline-offset-[.375rem] cursor-pointer transition-all duration-300 ease-in-out donace-button pb-2 pt-1 flex items-center m-0 leading-6" radius="none">
                                            <Smartphone className="w-3.5 h-3.5 mr-1 mt-0.5 stroke-2 flex-shrink-0 block align-middle" />
                                            <div className="label">Use Phone Number</div>
                                        </Button>
                                    </div>
                                    {placements.map((placement) => (
                                        <Input
                                            value={value}
                                            type="email"
                                            label="Email"
                                            isInvalid={isInvalid}
                                            color={isInvalid ? "danger" : "success"}
                                            errorMessage={isInvalid && "Please enter a valid email"}
                                            onValueChange={setValue}
                                            key={placement}
                                            labelPlacement={"inside"}
                                            isClearable
                                            placeholder="your@email.com"
                                            className="text-base h-auto transition-all duration-300 leading-4 rounded-lg w-full m-0"
                                            // onChange={e => setUserName(e.target.value)}
                                        />
                                    ))}
                                    <Input
                                        label="Password"
                                        labelPlacement={"inside"}
                                        placeholder="yoursecretpassword"
                                        className="pt-2 text-base h-auto transition-all duration-300 leading-4 rounded-lg w-full m- mb-6"
                                        type={isVisible ? "text" : "password"}
                                        // onChange={e => setPassword(e.target.value)}
                                    />
                                    <Button  type="submit" className="mb-12 text-[#fff] bg-[#333537] border-[#333537] border border-solid w-full cursor-pointer transition-all duration-300 ease-in-out font-medium rounded-lg relative whitespace-nowrap justify-center outline-none max-w-full text-base p-[0.625rem_0.875rem] h-[calc(2.25rem+2*1px)] flex items-center m-0 leading-6">
                                        <div className="label">Continue with Email</div>
                                    </Button>
                                </form>
                            </div>
                        </CardBody>
                        <CardFooter className="-mb-2 border-t border-solid border-[rgba(19,21,23,0.08)]">
                            <Button className="mb-12 text-text-black-more-blur-light-theme bg-[rgba(19,21,23,0.04)] border-[rgba(19,21,23,0.04)] border border-solid w-full cursor-pointer transition-all duration-300 ease-in-out font-medium rounded-lg relative whitespace-nowrap justify-center outline-none max-w-full text-base p-[0.625rem_0.875rem] h-[calc(2.25rem+2*1px)] flex items-center m-0 leading-6">
                                <FaGoogle className="mr-2 stroke-2 w-4 h-4 flex-shrink-0 block align-middle" />
                                <div className="label">Sign in with Google</div>
                            </Button>
                        </CardFooter>
                    </div>
                </div>
            </Card>
        </div>
    )
}
// SignIn.propTypes = {
//     setToken: PropTypes.func.isRequired
// }

