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
import { signIn } from "next-auth/react";

export default function SignUp() {
  const [isVisible, setIsVisible] = React.useState(false);
  const router = useRouter();

  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [error, setError] = React.useState("");

  const validateEmail = (value: string) =>
    value.match(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+.[A-Z]{2,4}$/i);

  const isInvalidEmail = React.useMemo(() => {
    if (email === "") return false;

    return validateEmail(email) ? false : true;
  }, [email]);

  const submit = async () => {
    var resultRegister = await fetchWrapper.post(
      "/api/Authentication/register",
      {
        email,
        password,
      }
    );

    if (resultRegister?.result?.succeeded === false) {
      setError(resultRegister?.result?.errors[0]?.description);
      return;
    }

    const resultLogin = await signIn("credentials", {
      email: email,
      password: password,
      redirect: false,
    });

    if (resultLogin?.ok) {
      router.push("/home");
    } else {
      setError("Đăng ký thành công, nhưng tạm thời không đăng nhập được");
    }
  };


  return (
    <div className="onboarding-page">
      <Card className="onboarding-card opacity-[1] relative flex-1 p-6 bg-[rgba(255,255,255,0.8)] backdrop-blur-lg rounded-3xl overflow-visible max-w-sm w-full">
        <div className="relative">
          <CardHeader className="opacity-[1] transform-none">
            <div className="icon relative w-16 h-16 flex items-center justify-center bg-[rgba(19,21,23,0.04)] rounded-full">
              <UserPlus className="w-8 h-8 text-[#939597] block align-middle ml-1" />
            </div>
          </CardHeader>
          <CardBody className="opacity-[1] transform-none">
            <div className="gap-2 pt-1 mb-4 flex flex-col">
              <h1 className="font-semibold text-2xl mb-0 mt-0 leading-5">
                Đăng ký
              </h1>
              <div className="text-secondary pt-0.5 pb-1 text-sm text-black-more-blur-light-theme">
                Tạo tài khoản mới để sử dụng dịch vụ.
              </div>
            </div>
            <div>
              <Input
                value={email}
                type="email"
                label="Email"
                isInvalid={isInvalidEmail}
                color={isInvalidEmail ? "danger" : "success"}
                errorMessage={isInvalidEmail && "Email không hợp lệ."}
                onValueChange={setEmail}
                isRequired
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
                isRequired
                labelPlacement={"inside"}
                placeholder="Password của bạn"
                className="pt-2 text-base h-auto transition-all duration-300 leading-4 rounded-lg w-full m-0 mb-4"
                type={isVisible ? "text" : "password"}
              />
            <div className="mb-3 ml-1">
              {error && (
                <div className="text-[#f3236a]">
                  <div className="label break-words">{error}</div>
                </div>
              )}
            </div>
              <Button
                type="button"
                onClick={submit}
                className="mb-12 text-[#fff] bg-[#333537] border-[#333537] border border-solid w-full cursor-pointer transition-all duration-300 ease-in-out font-medium rounded-lg relative whitespace-nowrap justify-center outline-none max-w-full text-base p-[0.625rem_0.875rem] h-[calc(2.25rem+2*1px)] flex items-center m-0 leading-6"
              >
                <div className="label">Đăng ký</div>
              </Button>
            </div>
          </CardBody>
          <Divider />
          <CardFooter className="-mb-2 flex justify-center items-center">
            <div className="">Đã có tài khoản?</div>
            <div>&nbsp;</div>
            <Link href="/auth/login" underline="hover">
              Đăng nhập
            </Link>
          </CardFooter>
        </div>
      </Card>
    </div>
    // <div className="onboarding-page">
    //   <Card className="opacity-[1] relative flex-1 p-6 bg-[rgba(255,255,255,0.8)] backdrop-blur-lg max-w-sm rounded-2xl h-fit">
    //     <div className="relative h-[480px]">
    //       <div className="animated-container absolute top-0 w-full">
    //         <CardHeader className="opacity-[1] transform-none">
    //           <div className="icon relative w-16 h-16 flex items-center justify-center bg-[rgba(19,21,23,0.04)] rounded-full">
    //             <UserPlus className="w-8 h-8 text-[#939597] block align-middle ml-1" />
    //           </div>
    //         </CardHeader>
    //         <CardBody className="opacity-[1] transform-none">
    //           <div className="gap-2 pt-1 mb-4 flex flex-col">
    //             <h1 className="font-semibold text-2xl mb-0 mt-0 leading-5">
    //               Đăng ký
    //             </h1>
    //             <div className="text-secondary pt-0.5 pb-1 text-sm text-black-more-blur-light-theme">
    //               Tạo tài khoản mới để sử dụng dịch vụ.
    //             </div>
    //           </div>
    //           <div>
    //             <Input
    //               value={email}
    //               type="email"
    //               label="Email"
    //               isInvalid={isInvalidEmail}
    //               color={isInvalidEmail ? "danger" : "success"}
    //               errorMessage={isInvalidEmail && "Email không hợp lệ"}
    //               onValueChange={setEmail}
    //               isRequired
    //               isClearable
    //               placeholder="Email của bạn"
    //               className="text-base h-auto transition-all duration-300 leading-4 rounded-lg w-full m-0"
    //             />
    //             <Input
    //               label="Mật khẩu"
    //               value={password}
    //               onValueChange={setPassword}
    //               isRequired
    //               labelPlacement={"inside"}
    //               placeholder="Password của bạn"
    //               className="pt-2 text-base h-auto transition-all duration-300 leading-4 rounded-lg w-full m- mb-6"
    //               type={isVisible ? "text" : "password"}
    //             />
    //             <Button
    //               type="button"
    //               onClick={submit}
    //               className="mb-12 text-[#fff] bg-[#333537] border-[#333537] border border-solid w-full cursor-pointer transition-all duration-300 ease-in-out font-medium rounded-lg relative whitespace-nowrap justify-center outline-none max-w-full text-base p-[0.625rem_0.875rem] h-[calc(2.25rem+2*1px)] flex items-center m-0 leading-6"
    //             >
    //               <div className="label">Đăng ký</div>
    //             </Button>
    //           </div>

    //           <div className="mt-5">
    //             {error && (
    //               <div className="text-red-500">
    //                 <div className="label break-words">{error}</div>
    //               </div>
    //             )}
    //           </div>
    //         </CardBody>
    //         <Divider />
    //         <CardFooter className="-mb-2 flex justify-center items-center">
    //           <div className="">Đã có tài khoản?</div>
    //           <div>&nbsp;</div>
    //           <Link href="/auth/login" underline="hover">
    //             Đăng nhập
    //           </Link>
    //         </CardFooter>
    //       </div>
    //     </div>
    //   </Card>
    // </div>
  );
}
