"use client";
import "@/styles/globals.css";
import React from "react";
import { Button } from "@nextui-org/button";
import { Card, CardHeader, CardBody } from "@nextui-org/card";
import { Input } from "@nextui-org/input";
import { ArrowLeft, DoorOpen } from "lucide-react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function SignIn() {
  const router = useRouter();
  const [isVisible, setIsVisible] = React.useState(false);

  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");

  const validateEmail = (value: string) =>
    value.match(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+.[A-Z]{2,4}$/i);

  const isInvalidEmail = React.useMemo(() => {
    if (email === "") return false;

    return validateEmail(email) ? false : true;
  }, [email]);

  const onSubmit = async () => {
    const result = await signIn("credentials", {
      email: email,
      password: password,
      redirect: false,
    });

    if (result?.ok) router.push("/home");
    // TODO: Xử lý hiển thị lỗi sai tk & mk lên form
    console.log(result);
  };

  return (
    <div className="onboarding-page">
      <Card className="opacity-[1] relative flex-1 p-6 bg-[rgba(255,255,255,0.8)] backdrop-blur-lg max-w-sm rounded-2xl h-fit">
        <div className="relative h-[380px]">
          <div className="animated-container absolute top-0 w-full">
            {/* Icon */}
            <CardHeader className="opacity-[1] transform-none">
              <div className="icon relative w-16 h-16 flex items-center justify-center bg-[rgba(19,21,23,0.04)] rounded-full">
                <DoorOpen className="w-8 h-8 text-[#939597] block align-middle" />
                <ArrowLeft className="top-6 right-2.5 absolute text-[#939597] block w-4 h-4 align-middle" />
              </div>
            </CardHeader>

            <CardBody className="opacity-[1] transform-none">
              <div className="gap-2 pt-1 mb-4 flex flex-col">
                <h1 className="font-semibold text-2xl mb-0 mt-0 leading-5">
                  Welcome to Donace
                </h1>
                <div className="text-secondary pt-0.5 pb-1 text-sm text-black-more-blur-light-theme">
                  Please sign in or sign up below.
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
                  isClearable
                  placeholder="your@email.com"
                  className="text-base h-auto transition-all duration-300 leading-4 rounded-lg w-full m-0"
                />

                <Input
                  label="Password"
                  value={password}
                  onValueChange={setPassword}
                  labelPlacement={"inside"}
                  placeholder="your secret password"
                  className="pt-2 text-base h-auto transition-all duration-300 leading-4 rounded-lg w-full m- mb-6"
                  type={isVisible ? "text" : "password"}
                />
                <Button
                  onClick={onSubmit}
                  type="button"
                  className="mb-12 text-[#fff] bg-[#333537] border-[#333537] border border-solid w-full cursor-pointer transition-all duration-300 ease-in-out font-medium rounded-lg relative whitespace-nowrap justify-center outline-none max-w-full text-base p-[0.625rem_0.875rem] h-[calc(2.25rem+2*1px)] flex items-center m-0 leading-6"
                >
                  <div className="label">Login</div>
                </Button>
              </div>
            </CardBody>
          </div>
        </div>
      </Card>
    </div>
  );
}

// UnUse Code
// -----------------------------------------------------------------------------------------------------
{
  /* <CardFooter className="-mb-2 border-t border-solid border-[rgba(19,21,23,0.08)]">
              <Button className="mb-12 text-text-black-more-blur-light-theme bg-[rgba(19,21,23,0.04)] border-[rgba(19,21,23,0.04)] border border-solid w-full cursor-pointer transition-all duration-300 ease-in-out font-medium rounded-lg relative whitespace-nowrap justify-center outline-none max-w-full text-base p-[0.625rem_0.875rem] h-[calc(2.25rem+2*1px)] flex items-center m-0 leading-6">
                <FaGoogle className="mr-2 stroke-2 w-4 h-4 flex-shrink-0 block align-middle" />
                <div className="label">Sign in with Google</div>
              </Button>
            </CardFooter> */
}

{
  /* <div className="spread flex justify-end items-center">
                    <Button
                      className="text-black-blur-light-theme bg-transparent p-0 h-auto border-none outline-offset-[.375rem] cursor-pointer transition-all duration-300 ease-in-out donace-button pb-2 pt-1 flex items-center m-0 leading-6"
                      radius="none"
                    >
                      <Smartphone className="w-3.5 h-3.5 mr-1 mt-0.5 stroke-2 flex-shrink-0 block align-middle" />
                      <div className="label">Use Phone Number</div>
                    </Button>
                  </div> */
}
