"use client";
import "@/styles/globals.css";
import React from "react";
import { Button } from "@nextui-org/button";
import { Card, CardHeader, CardBody, CardFooter } from "@nextui-org/card";
import { Input } from "@nextui-org/input";
import { Link } from "@nextui-org/link";
import { UserPlus } from "lucide-react";
import { Divider } from "@nextui-org/divider";
import { fetchWrapper } from "../../helpers/fetch-wrapper";
import { useRouter } from "next/navigation";
import { Spinner } from "@nextui-org/react";
import { useSession } from "next-auth/react";

import donaceLofo from "@/public/doanLogo.png";

export default function SignUp() {
  const { data: session } = useSession();
  const [isVisible, setIsVisible] = React.useState(false);
  const router = useRouter();

  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [error, setError] = React.useState("");

  const [isLoading, SetIsLoading] = React.useState(false);

  const validateEmail = (value: string) =>
    value.match(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+.[A-Z]{2,4}$/i);

  const isInvalidEmail = React.useMemo(() => {
    if (email === "") return false;

    return validateEmail(email) ? false : true;
  }, [email]);

  const handleSignIn = async () => {
    if (email === "" || password === "") {
      setError("Vui lòng nhập đẩy đủ thông tin");
      return;
    }

    if (isInvalidEmail) {
      setError("Vui lòng nhập email hợp lệ");
      return;
    }

    // Đăng ký tài khoản
    SetIsLoading(true);
    var resultRegister = await fetchWrapper.post(
      "/api/Authentication/register",
      {
        email,
        password,
      }
    );

    if (resultRegister?.result?.succeeded === false) {
      if (resultRegister?.result?.errors[0]?.code === "DuplicateUserName") {
        setError("Tài khoản đã tổn tại, Vui lòng dùng Email khác");
      } else {
        setError(resultRegister?.result?.errors[0]?.description);
      }

      SetIsLoading(false);
    }

    // Đăng lý lịch mặc định
    try {
      await fetchWrapper.postWithToken(
        "api/Calendar/create-calendar",
        {
          name: "Cá nhân",
          avatar: donaceLofo.src
        },
        resultRegister?.token
      );

      if (session) {
        // If already logged in, redirect to the home page or any default page
        router.push('/');
      } else {
        // let callbackUrl = path?.get("callbackUrl");
        // if (callbackUrl == undefined || callbackUrl == null || callbackUrl == "" || callbackUrl == " ") {
        //   callbackUrl = "/"
        // }
        // // Dùng tài khoản đã đăng ký để login
        // const resultLogin = await signIn("credentials", {
        //   email: email,
        //   password: password,
        //   redirect: false,
        //   callbackUrl: callbackUrl,
        // });

        // if (!resultLogin?.error) {
        //   // Redirect the user after successful sign-in
        //   // You can use router.push or any other navigation method
        //   if (resultLogin && callbackUrl) {
        //     router.push(callbackUrl);
        //   }
        // } else {
        //   setError("Đăng ký thành công, nhưng tạm thời không đăng nhập được");
        // }
        router.push("/auth/login");
      }
    } catch (ex) {
      setError("Có lỗi xảy ra, vui lòng thử lại");
    }
    SetIsLoading(false);

  };

  return (
    <div className="onboarding-page px-2">
      <form onSubmit={handleSignIn}>
        <Card className="onboarding-card relative p-6 bg-background bg-opacity-70 backdrop-blur-lg rounded-3xl w-full">
          <CardHeader className=" ">
            <div className="icon relative w-16 h-16 flex items-center justify-center bg-background rounded-full">
              <UserPlus className="w-8 h-8  block align-middle ml-1" />
            </div>
          </CardHeader>
          <CardBody className=" ">
            <div className="gap-2 pt-1 mb-4 flex flex-col">
              <h1 className="font-semibold text-2xl mb-0 mt-0 leading-5  whitespace-nowrap">
                Đăng ký
              </h1>
              <div className="text-secondary p-1 text-sm whitespace-nowrap w-[300px]">
                Tạo tài khoản mới để sử dụng dịch vụ.
              </div>
            </div>
            <div className="flex flex-col gap-4">
              <Input
                value={email}
                type="email"
                label="Email"
                variant="bordered"
                isInvalid={isInvalidEmail}
                color={isInvalidEmail ? "danger" : "success"}
                errorMessage={isInvalidEmail && "Email không hợp lệ."}
                onValueChange={setEmail}
                isRequired
                isClearable
                placeholder="Email của bạn"
                className="text-base transition-all duration-300 leading-4 rounded-lg w-full"
                classNames={{
                  errorMessage: ["text-base"],
                }}
              />
              <Input
                variant="bordered"
                label="Mật khẩu"
                value={password}
                onValueChange={setPassword}
                isRequired
                minLength={6}
                labelPlacement={"inside"}
                placeholder="Mật khẩu của bạn"
                className="text-base  transition-all duration-300 leading-4 rounded-lg w-full"
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
                variant="bordered"
                isDisabled={isLoading}
                type="submit"
                className="bg-background bg-opacity-70 w-full cursor-pointer transition-all duration-300 ease-in-out font-medium rounded-lg relative whitespace-nowrap justify-center text-base  flex items-center leading-6"
              >
                <div className="label  w-full">
                  {isLoading ? (
                    <div className="inline-flex flex-col gap-2 justify-between w-full">
                      <Spinner
                        size="sm"
                        color="success"
                        className=""
                      />
                      <span className="label">Đang đăng ký..</span>
                    </div>
                  ) : (
                    <>
                      <div className="label">Đăng ký</div>
                    </>
                  )}
                </div>
              </Button>
            </div>
          </CardBody>
          <Divider />
          <CardFooter className=" flex justify-between flex-col md:flex-row items-center">
            <div className="">Đã có tài khoản?</div>
            <div>&nbsp;</div>
            <Link href="/auth/login" underline="hover">
              Đăng nhập
            </Link>
          </CardFooter>
        </Card>

      </form>
    </div>
  );
}
