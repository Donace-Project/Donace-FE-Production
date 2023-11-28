"use client";
import "@/styles/globals.css";
import React, { useState } from "react";
import { Button } from "@nextui-org/button";
import { Card, CardHeader, CardBody, CardFooter } from "@nextui-org/card";
import { Input } from "@nextui-org/input";
import { ArrowLeft, CheckCircle, DoorOpen, UserCircle2 } from "lucide-react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Divider } from "@nextui-org/divider";
import { Link } from "@nextui-org/link";
import { Spinner } from "@nextui-org/react";

export default function SignIn() {
  const router = useRouter();
  const [isVisible, setIsVisible] = React.useState(false);
  const [isLoading, setIsLoading] = useState(false);


  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");

  const validateEmail = (value: string) =>
    value.match(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+.[A-Z]{2,4}$/i);

  const isInvalidEmail = React.useMemo(() => {
    if (email === "") return false;

    return validateEmail(email) ? false : true;
  }, [email]);

  const [error, setError] = useState("");

  const onSubmit = async () => {
    setIsLoading(true);
    const result = await signIn("credentials", {
      email: email,
      password: password,
      redirect: false,
    });

    if (result?.ok) {
      router.push("/home");
    } else {
      // Xử lý hiển thị lỗi
      setError("Sai tài khoản hoặc mật khẩu.");
    }
    setIsLoading(false);
  };


  return (
    <div className="onboarding-page">
      <Card className="onboarding-card opacity-[1] relative flex-1 p-6 bg-[rgba(255,255,255,0.8)] backdrop-blur-lg rounded-3xl overflow-visible max-w-sm w-full">
        <div className="relative">
          <CardHeader className="opacity-[1] transform-none">
            <div className="icon relative w-16 h-16 flex items-center justify-center bg-[rgba(19,21,23,0.04)] rounded-full">
              <DoorOpen className="w-8 h-8 text-[#939597] block align-middle" />
              <ArrowLeft className="top-6 right-2.5 absolute text-[#939597] block w-4 h-4 align-middle" />
            </div>
          </CardHeader>
          <CardBody>
            <h1 className="font-semibold text-2xl mb-0 mt-0 leading-5">
              Chào mừng đến Donace
            </h1>
            <div className="text-secondary pt-4 pb-5 text-sm text-black-more-blur-light-theme">
              Vui lòng đăng ký hoặc đăng nhập bên dưới.
            </div>
            <Input
              value={email}
              type="email"
              label="Email"
              isInvalid={isInvalidEmail}
              color={isInvalidEmail ? "danger" : "success"}
              errorMessage={isInvalidEmail && "Vui lòng điền đúng email."}
              onValueChange={setEmail}
              isClearable
              placeholder="Email của bạn"
              className="text-base h-auto transition-all duration-300 leading-4 rounded-lg w-full m-0"
              classNames={{
                errorMessage: [
                  "text-base"
                ]
              }}
            />
            <Input
              label="Mật khẩu"
              value={password}
              onValueChange={setPassword}
              labelPlacement={"inside"}
              placeholder="Mật khẩu của bạn"
              className="pt-2 text-base h-auto transition-all duration-300 leading-4 rounded-lg w-full m-0 mb-4 transparentInput"
              type={isVisible ? "text" : "password"}
            />
            <div className="mb-3 ml-1">
              {error && <div className="text-[#f3236a]">
                <div className="label break-words">{error}</div>
              </div>}
            </div>
            <Button
              disabled={isLoading}
              onClick={onSubmit}
              type="button"
              className="mb-12 text-[#fff] bg-[#333537] border-[#333537] border border-solid w-full cursor-pointer transition-all duration-300 ease-in-out font-medium rounded-lg relative whitespace-nowrap justify-center outline-none max-w-full text-base p-[0.625rem_0.875rem] h-[calc(2.25rem+2*1px)] flex items-center m-0 leading-6"
            >
              <div className="label">
                {isLoading ? (
                  <>
                    <Spinner size="sm" color="success" className="translate-y-0.5 mr-2"/>
                    <span className="label">Đang đăng nhập..</span>
                  </>
                ) : (
                  <>
                    <div id="label" className="...">Đăng nhập</div>
                  </>
                )}
              </div>
            </Button>
          </CardBody>
          <Divider />
          <CardFooter className="-mb-2 flex justify-center items-center">
            <div className="">Bạn không có tài khoản?</div>
            <div>&nbsp;</div>
            <Link href="/auth/register" underline="hover">
              Đăng ký ngay
            </Link>
          </CardFooter>
        </div>
      </Card>
    </div>
  );
}
