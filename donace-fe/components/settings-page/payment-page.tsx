'use client';
import React, { useState } from 'react'
import { Button } from "@nextui-org/button";
import { Link } from "@nextui-org/link";
import { CreditCard, Plus, Receipt } from "lucide-react";
import { Modal, ModalContent, ModalBody, useDisclosure } from "@nextui-org/react";
import { usePaymentInputs, PaymentInputsWrapper } from 'react-payment-inputs';
import { css } from 'styled-components';
import { ThemeProvider } from 'styled-components';
import images from 'react-payment-inputs/images';

const ERROR_MESSAGES = {
    emptyCardNumber: 'Số thẻ không được để trống',
    invalidCardNumber: 'Số thẻ không hợp lệ',
    emptyExpiryDate: 'Ngày kích hoạt thẻ không được để trống',
    monthOutOfRange: 'Bạn đã nhập sai tháng, vui lòng thử lại',
    yearOutOfRange: 'Bạn đã nhập sai năm, vui lòng thử lại',
    dateOutOfRange: 'Bạn đã nhập sai ngày, vui lòng thử lại',
    invalidExpiryDate: 'Không đúng ngày kích hoạt trên thẻ',
    emptyCVC: 'CVC không được để trống',
    invalidCVC: 'CVC không hợp lệ'
}
export default function PaymentPage() {
    // payment UI
    const {
        wrapperProps,
        getCardImageProps,
        getCardNumberProps,
        getExpiryDateProps,
        getCVCProps,
    } = usePaymentInputs({
        errorMessages: ERROR_MESSAGES
    });
    //
    // modal
    const { isOpen, onOpen, onOpenChange } = useDisclosure();
    //
    return (
        <>
            <div className="page-content">
                <div className="page-header opacity-[1] pt-12 pl-4 pr-4 max-width-global margin-global">
                    <div className="spread gap-2 mb-2 flex justify-between items-center">
                        <h1 className="tab-title text-4xl font-semibold mb-0 mt-0">Cài đặt</h1>
                    </div>
                </div>
                <div className="tab-wrapper m-auto pt-2">
                    <div className="zm-container pt-1 max-width-global margin-global">
                        <div className="page-header-tabs-wrapper flex justify-between items-baseline">
                            <div className="flex max-w-full overflow-auto min-w-0 gap-4 flex-1">
                                <div className="side-padding">&nbsp;</div>
                                <Link href="/settings"
                                    className="text-black-blur-light-theme dark:text-[hsla(0,0%,100%,.5)] border-b-2 border-solid border-transparent whitespace-nowrap inline-block pb-2 transition-all duration-300 ease-in-out cursor-pointer"
                                    underline="none"
                                >
                                    Tài khoản
                                </Link>
                                <Link href="/preferences"
                                    className="text-black-blur-light-theme dark:text-[hsla(0,0%,100%,.5)] border-b-2 border-solid border-transparent whitespace-nowrap inline-block pb-2 transition-all duration-300 ease-in-out cursor-pointer"

                                    underline="none"
                                >
                                    Tùy chọn
                                </Link>
                                <Link href="/settings/payment"
                                    className="text-black-light-theme dark:text-[#fff] border-b-2 border-solid border-[rgb(19,21,23)] dark:border-[#fff] whitespace-nowrap inline-block pb-2 transition-all duration-300 ease-in-out cursor-pointer"
                                    underline="none"
                                >
                                    Thanh toán
                                </Link>
                                <div className="side-padding pl-0.5"></div>
                            </div>
                        </div>
                    </div>
                    <div className="border-b border-solid border-[rgba(19,21,23,0.08)] dark:border-[rgba(255,255,255,0.08)] mb-7"></div>
                </div>
                <div className="zm-container pl-4 pr-4 max-width-global margin-global">
                    <div className="can-divide with-divider-medium">
                        <div className="section-title-wrapper medium">
                            <div className="section-title-row mb-5 flex justify-between items-center">
                                <h2 className="text-xl font-semibold text-black-light-theme dark:text-[#fff] mb-0">Phương thức Thanh toán</h2>
                            </div>
                            <div className="section-subtitle -mt-3.5 mb-5 text-[#737577] dark:text-[#d2d4d7] text-base">Thanh toán của bạn sẽ được lưu và bảo mật bởi <span className='text-red-500'>VN</span><span className='text-blue-500'>Pay.</span></div>
                        </div>
                        <Button
                            type="button"
                            className="text-[#fff] bg-[#333537] border-[#333537] focus-visible:outline-2 focus-visible:outline focus-visible:outline-[#333537] border border-solid cursor-pointer transition-all duration-300 ease-in-out donace-button-w-fit mt-6 flex items-center m-0"
                            onPress={onOpen}
                        >
                            <Plus className="mr-2 stroke-2 w-4 h-4 flex-shrink-0 block align-middle" />
                            <div className="label">Thêm phương thức thanh toán</div>
                        </Button>
                        <Modal
                            isOpen={isOpen} onOpenChange={onOpenChange}
                            size="md"
                            radius="lg"
                            classNames={{
                                base: "flex flex-col relative",
                                closeButton: "hidden"
                            }}
                        >
                            <ModalContent>
                                {(onClose) => (
                                    <>
                                        <ModalBody
                                            className="w-full p-[1rem_1.25rem]"
                                        >
                                            <div className="flex flex-col">
                                                <div className="lux-alert-top pt-1">
                                                    <div className="icon-wrapper m-[0.25rem_0px_0.75rem] w-14 h-14 rounded-full text-[#737577] dark:text-[#d2d4d7] bg-[rgba(19,21,23,0.04)] dark:bg-[rgba(255,255,255,0.08)] justify-center flex items-center">
                                                        <CreditCard className="w-8 h-8 block align-middle" />
                                                    </div>
                                                    <div className="title font-semibold text-xl mb-2">Thêm phương thức thanh toán</div>
                                                    <div className="desc text-black-more-blur-light-theme dark:text-[hsla(0,0%,100%,.79)]">Thêm phương thức thanh toán để mua vé tham gia sự kiện. Thông tin của bạn sẽ được chúng tôi bảo mật an toàn.</div>
                                                </div>
                                                <div className="pt-1 mt-2">
                                                    <PaymentInputsWrapper
                                                        {...wrapperProps}
                                                        styles={{
                                                            fieldWrapper: {
                                                                base: css`
                                                                    margin-bottom: 1rem;
                                                                `,
                                                                errored: ''
                                                            },
                                                            inputWrapper: {
                                                                base: css`
                                                                    width: 25.5rem
                                                                `,
                                                                errored: css`
                                                                    color: red
                                                                    
                                                                `,
                                                                focused: css`
                                                                    `
                                                            },
                                                            input: {
                                                                base: css`
                                                                `,
                                                                errored: css`
                                                                    color: red;
                                                                `,
                                                                cardNumber: css`
                                                                    width: 15rem
                                                                `,
                                                                expiryDate: css`
                                                                    width: 8rem
                                                                `,
                                                                cvc: css`
                                                                `
                                                            },
                                                            errorText: {
                                                                base: css`
                                                                    color: red;
                                                            `
                                                            }
                                                        }}
                                                    >
                                                        <input {...getCardNumberProps()} />
                                                        <input {...getExpiryDateProps()} />
                                                        <input {...getCVCProps()} />
                                                    </PaymentInputsWrapper>
                                                </div>
                                                <Button
                                                    type='button'
                                                    className='text-[#fff] bg-[#333537] border-[#333537] border border-solid cursor-pointer transition-all duration-300 ease-in-out donace-button mt-4 flex items-center m-0'
                                                >
                                                    <div className='label'>Thêm phương thức giao dịch</div>
                                                </Button>
                                            </div>
                                        </ModalBody>
                                    </>
                                )}
                            </ModalContent>
                        </Modal>
                    </div>
                    <div className="can-divide with-divider-medium mt-8 pt-8 border-t border-solid border-[rgba(19,21,23,0.08)] dark:border-[rgba(255,255,255,0.08)]">
                        <div className="section-title-wrapper medium">
                            <div className="section-title-row mb-5 flex justify-between items-center">
                                <h2 className="text-xl font-semibold text-black-light-theme dark:text-[#fff] mb-0">Lịch sử giao dịch</h2>
                            </div>
                            <div className="lux-empty-state text-center mt-16 flex flex-col items-center">
                                <div className="icon illu justify-center flex items-center">
                                    <div className="mb-2">
                                        <Receipt className="w-64 h-auto block align-middle text-foreground-300 dark:text-neutral-700"/>
                                    </div>
                                </div>
                                <h3 className="text-2xl font-medium text-black-more-blur-light-theme dark:text-[hsla(0,0%,100%,.79)] p-0 mt-6 mb-0">Không có giao dịch nào gần đây</h3>
                                <div className="desc pl-12 pr-12 text-black-blur-light-theme dark:text-[hsla(0,0%,100%,.5)] mt-2">Bạn chưa thực hiện thanh toán nào trên Donace</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}