"use client";
import "@/styles/globals.css";
import React, { use, useEffect, useState } from "react";
import { Button } from "@nextui-org/button";
import { Card, CardHeader, CardBody, CardFooter } from "@nextui-org/card";
import { Input } from "@nextui-org/input";
import { ArrowLeft, CheckCircle, DoorOpen, UserCircle2 } from "lucide-react";
import { signIn } from "next-auth/react";
import { Divider } from "@nextui-org/divider";
import { Link } from "@nextui-org/link";
import { Spinner } from "@nextui-org/react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { on } from "events";
// import { time } from "console";

import { useSession } from "next-auth/react";


export default function SignIn() {

  const path = useSearchParams();
  const { data: session } = useSession();
  const [isVisible, setIsVisible] = React.useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");

  const validateEmail = (value: string) =>
    value.match(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+.[A-Z]{2,4}$/i);

  const isInvalidEmail = React.useMemo(() => {
    if (email === "") return false;

    return validateEmail(email) ? false : true;
  }, [email]);

  const [error, setError] = useState("");
  // const [path, setPath] = useState("/home");

  // useEffect(() => {
  //   const baseUrl = window.location;
  //   const callbackUrl = `${baseUrl}`;
  //   let urlPath = callbackUrl.split('/auth/login?callbackUrl=')[1];

  //   if (urlPath != undefined && urlPath != null) {
  //     setPath(urlPath);
  //   }
  //   // Callback URL: http://localhost:3000/auth/login?callbackUrl=http://localhost:3000/create/path/to/callback
  // }, []);

  const handleSignIn = async (e: any) => {
    e.preventDefault();
    if (session) {
      // If already logged in, redirect to the home page or any default page
      router.push('/');
    } else {
      setIsLoading(true);
      let callbackUrl = path?.get("callbackUrl");
      try {
        if (callbackUrl != undefined || callbackUrl == null || callbackUrl == "" || callbackUrl == " ") {
          callbackUrl = "/"
        }
        // debugger;
        const result = await signIn("credentials", {
          email: email,
          password: password,
          redirect: false,
          callbackUrl: callbackUrl,
        });
        if (!result?.error) {
          // Redirect the user after successful sign-in
          // You can use router.push or any other navigation method
          if (result && callbackUrl) {
            router.push(callbackUrl);
          }
        } else {
          // Xử lý hiển thị lỗi
          setError("Sai tài khoản hoặc mật khẩu.");
        }
      } catch (error) {
        // Handle other errors
        console.error('Có lỗi trong quá trình đăng nhập:', error);
        setError('Làm ơn hãy thử lại');
      }
      setIsLoading(false);
    }

  };

  return (
    <div className="onboarding-page px-2">
      <form onSubmit={
        handleSignIn
      }>
        <Card className="onboarding-card  relative flex p-6 bg-background bg-opacity-70  shadow-lg dark:shadow-slate-900 border border-background backdrop-blur-lg rounded-3xl  w-full">
          <CardHeader className="">
            <div className="icon relative w-16 h-16 flex items-center justify-center bg-background rounded-full">
              <DoorOpen className="w-8 h-8 block align-middle" />
              <ArrowLeft className="top-6 right-2.5 absolute block w-4 h-4 align-middle" />
            </div>
          </CardHeader>
          <CardBody>
            <h1 className="font-semibold text-2xl mb-0 mt-0 leading-5 whitespace-nowrap">
              Chào mừng đến Donace
            </h1>
            <div className="pt-4 pb-5 text-sm w-[300px]">
              Vui lòng đăng ký hoặc đăng nhập bên dưới.
            </div>
            <div className="flex flex-col gap-4">

              <Input
                value={email}
                type="email"
                label="Email"
                isRequired
                variant="bordered"
                isInvalid={isInvalidEmail}
                color={isInvalidEmail ? "danger" : "success"}
                errorMessage={isInvalidEmail && "Vui lòng điền đúng email."}
                onValueChange={setEmail}
                isClearable
                placeholder="Email của bạn"
                className="text-base h-auto transition-all duration-300 leading-4 rounded-lg w-full m-0"
                classNames={{
                  errorMessage: ["text-base"],
                }}
              />
              <Input
                label="Mật khẩu"
                variant="bordered"
                isRequired
                value={password}
                onValueChange={setPassword}
                labelPlacement={"inside"}
                placeholder="Mật khẩu của bạn"
                className="pt-2 text-base h-auto transition-all duration-300 leading-4 rounded-lg w-full m-0 mb-4 transparentInput"
                type={isVisible ? "text" : "password"}
              />
              <div className="mb-3 ml-1 w-[300px]">
                {error && (
                  <div className="text-[#f3236a]">
                    <div className="label break-words">{error}</div>
                  </div>
                )}
              </div>
              <Button
                isDisabled={isLoading}
                variant="bordered"
                type="submit"
                className="bg-background bg-opacity-70 w-full cursor-pointer transition-all duration-300 ease-in-out font-medium relative whitespace-nowrap justify-center max-w-full text-base flex items-center leading-6"
              >
                <div className="label">
                  {isLoading ? (
                    <div className="inline-flex justify-between gap-2 flex-row">
                      <Spinner
                        size="sm"
                        color="success"
                        className=""
                      />
                      <span className="label">Đang đăng nhập..</span>
                    </div>
                  ) : (
                    <>
                      <div id="label" className="">
                        Đăng nhập
                      </div>
                    </>
                  )}
                </div>
              </Button>
            </div>

          </CardBody>
          <Divider />
          <CardFooter className="flex justify-between items-center flex-col md:flex-row">
            <div className="">Bạn không có tài khoản?</div>
            <div>&nbsp;</div>
            <Link href="/auth/register" underline="hover" color="primary">
              Đăng ký ngay
            </Link>
          </CardFooter>
        </Card>
      </form>

    </div>
  );
}
