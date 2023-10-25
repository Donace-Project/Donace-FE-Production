"use client";
import React from "react";
import "@/styles/globals.css";
import { Avatar } from "@nextui-org/avatar";
import { Button } from "@nextui-org/button";
import { Link } from "@nextui-org/link";
import { Calendar, Pen, Plus } from "lucide-react";
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, useDisclosure, ModalProps } from "@nextui-org/modal";
import { Input } from "@nextui-org/input";

export default function ProfilePage() {
    const { isOpen, onOpen, onOpenChange } = useDisclosure();
    const [scrollBehavior, setScrollBehavior] = React.useState<ModalProps["scrollBehavior"]>("inside");

    return (
        <div className="page-content">
            <div className="profile-page-theme font-sans font-normal">
                <div>
                    <div className="profile-page-wrapper">
                        <div className="profile-content-container">
                            <div className="profile-bio is-me pt-4 bg-[#f0f7fb] dark:bg-[#111315]">
                                <div className="user-header-wrapper p-[0_1rem] w-full max-w-2xl m-auto">
                                    <div className="user-header pr-0 pb-8 pl-0 pt-8 block text-center">
                                        <div className="image-container w-32 m-auto">
                                            <Link href="/my-calendar" className="transition-all duration-300 ease-in-out cursor-pointer" underline="none">
                                                <div className="avatar-wrapper">
                                                    <Avatar src="https://avatars.githubusercontent.com/u/143386751?s=200&v=4" radius="full" name="Donace" className="w-32 h-32 bg-[#fff] relative" />
                                                </div>
                                            </Link>
                                        </div>
                                        <div className="bio-container">
                                            <div className="user-header-text">
                                                <Link className="text-inherit transition-all duration-300 ease-in-out cursor-pointer" underline="none">
                                                    <h1 className="font-semibold text-3xl mt-4 mb-4">Donace</h1>
                                                </Link>
                                            </div>
                                            <div className="justify-center flex items-center"></div>
                                            <div className="pt-4">
                                                <Modal
                                                    isOpen={isOpen}
                                                    onOpenChange={onOpenChange}
                                                    scrollBehavior={scrollBehavior}
                                                    
                                                >
                                                    <ModalContent>
                                                        {(onClose) => (
                                                            <>
                                                                <ModalHeader className="p-[0.75rem_1.25rem] border-b border-solid border-[#eff3f5] flex justify-between items-center">
                                                                    <div className="text-[#002f45] text-lg font-semibold">Edit Profile</div>
                                                                </ModalHeader>
                                                                <ModalBody>
                                                                    <Input
                                                                        autoFocus
                                                                        label="Email"
                                                                        placeholder="Enter your email"
                                                                        variant="bordered"
                                                                    />
                                                                    <Input
                                                                        
                                                                        label="Password"
                                                                        placeholder="Enter your password"
                                                                        type="password"
                                                                        variant="bordered"
                                                                    />
                                                                    <div className="flex py-2 px-1 justify-between">
                                                                            Remember me
                                                                        <Link color="primary" href="#" size="sm">
                                                                            Forgot password?
                                                                        </Link>
                                                                    </div>
                                                                </ModalBody>
                                                                <ModalFooter>
                                                                    <Button color="danger" variant="flat" onPress={onClose}>
                                                                        Close
                                                                    </Button>
                                                                    <Button color="primary" onPress={onClose}>
                                                                        Sign in
                                                                    </Button>
                                                                </ModalFooter>
                                                            </>
                                                        )}
                                                    </ModalContent>
                                                </Modal>
                                                <Button onPress={onOpen} type="button" className="bg-[#a2b7bf] text-white dark:bg-[#fff2] dark:text-[white] p-[0.25rem_0.75rem] font-medium border-none cursor-pointer transition-all duration-300 ease-in-out inline-flex items-center m-0" radius="full">
                                                    <Pen className="mr-1 w-3 h-3 block align-middle" />
                                                    <span className="text-base">Edit Bio</span>
                                                </Button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div id="profile-content" className="pt-4 w-full max-w-2xl flex flex-col pb-0 m-auto flex-1">
                                <div id="profile-block-wrapper" className="relative">
                                    <div className="h-auto block">
                                        <div className="profile-block-content">
                                            <div className="view-block block">
                                                <div>
                                                    <div className="profile-events-wrapper">
                                                        <div className="mb-4 overflow-hidden flex justify-between align-baseline">
                                                            <h2 className="font-semibold text-xl mb-0 overflow-hidden text-ellipsis mt-0">Events</h2>
                                                            <div className="whitespace-nowrap pl-2">
                                                                <Link href={"/"} className="block-action pl-0 pr-0 text-[#0099dd] dark:text-[#939597] inline-flex items-center justify-center transition-all duration-300 ease-in-out cursor-pointer" underline="none">
                                                                    <Plus className="mr-1 h-4 w-4 block align-middle mt-0.5" />
                                                                    <span>Create New</span>
                                                                </Link>
                                                            </div>
                                                        </div>
                                                        <div className="block">
                                                            <div className="profile-event-empty w-full text-center p-[2rem_1rem_2rem_1rem] text-[#a2b7bf] dark:text-[#939597] border border-solid border-[#eff3f5] dark:border-[#151719] rounded-lg flex flex-col items-center">
                                                                <Calendar className="w-8 h-8 mb-4 block align-middle" />
                                                                <div className="font-semibold mb-1">Nothing Upcoming</div>
                                                                <div className="text-sm">Subscribe to hear about what&apos;s coming up</div>
                                                            </div>
                                                        </div>
                                                        <div className="bottom-action mt-4">
                                                            <div id="block-action" className="inline-block p-0 text-[#a2b7bf]">
                                                                <Link href={"/"} className="transition-all duration-300 ease-in-out text-[#0099dd] dark:text-[#575a5d] cursor-pointer" underline="none">
                                                                    View Past
                                                                </Link>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="pt-4">
                                                <Button type="button" className="bg-[#a2b7bf] dark:bg-[#fff2] rounded-full p-[0.25rem_0.75rem] font-medium border-none cursor-pointer transition-all duration-300 ease-in-out inline-flex items-center m-0 leading-6 text-inherit">
                                                    <Pen className="mr-1 w-3 h-3 block align-middle text-white dark:text-white" />
                                                    <span className="text-white dark:text-white text-sm">Edit Block</span>
                                                </Button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="pb-12 pt-12"></div>
                            </div>
                        </div>
                        <div className="bar-container"></div>
                    </div>
                </div>
            </div>
        </div>
    )
}