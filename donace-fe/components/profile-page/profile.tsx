"use client";
import React from "react";
import "@/styles/globals.css";
import { Avatar } from "@nextui-org/avatar";
import { Button } from "@nextui-org/button";
import { Link } from "@nextui-org/link";
import { Calendar, Globe, Instagram, Linkedin, Pen, Plus, Twitter, Youtube } from "lucide-react";
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, useDisclosure, ModalProps } from "@nextui-org/modal";
import { Input } from "@nextui-org/input";
import { Textarea } from "@nextui-org/input";
import { FaTiktok } from 'react-icons/fa';
import { Checkbox } from "@nextui-org/checkbox";
import { fetchWrapper } from "../../helpers/fetch-wrapper";

export default function ProfilePage() {

    let [userProfile, setUserProfile] = useState<null | UserProfile>(null);
    var [pastEvents, setPastEvents] = useState<ItemEventsProfile[]>();


    useEffect(() => {
        // Gọi API profile và gán dữ liệu cho biến profile
        fetchWrapper.get('/api/User/profile')
            .then((data: UserProfile) => {
                console.log(data); // Xem dữ liệu được trả về từ API
                setUserProfile(data);
            })
            .catch(error => console.error('Lỗi khi gọi API:', error));
    }, []);

    useEffect(() => {
        fetchWrapper.get(`/api/Event?FromDate=01-01-1996&ToDate=${pastDateFormatted}&PageNumber=1&PageSize=9999`)
            .then(data => setPastEvents(data.items));
    }, []);

    const { isOpen, onOpen, onOpenChange } = useDisclosure();
    const [scrollBehavior, setScrollBehavior] = React.useState<ModalProps["scrollBehavior"]>("inside");
    const placements = [
        "outside"
    ];
    const variants = ["bordered"];
    const [modalPlacement, setModalPlacement] = React.useState("center");

    const updateProfileHandle = async ()=>{
        const res = await fetchWrapper.put('/api/User/update-profile',{
            userName: "test",
            avatar: "https://avatars.githubusercontent.com/u/143386751?s=200&v=4",
            bio: "string",
            instagram: "string",
            twitter: "string",
            youtube: "string",
            tiktok: "string",
            linkedIn: "string",
            website: "string"
        })
        console.log("🚀 ~ file: profile.tsx:36 ~ updateProfileHandle ~ res:", res)
    }

    return (
        <div className="page-content">
            <div className="profile-page-theme font-sans font-normal">
                <div>
                    <div className="profile-page-wrapper">
                        <div className="profile-content-container">
                            <div className="profile-bio is-me pt-4 bg-[#f0f7fb] dark:bg-[#0e151d]">
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
                                                    placement="center"
                                                >
                                                    <ModalContent>
                                                        {(onClose) => (
                                                            <>
                                                                <ModalHeader className="p-[0.75rem_1.25rem] border-b border-solid border-[#eff3f5] dark:border-[#0005] flex justify-between items-center">
                                                                    <div className="text-[#002f45] dark:text-white text-lg font-semibold">Edit Profile</div>
                                                                </ModalHeader>
                                                                <ModalBody className="w-full p-[1rem_1.25rem] overflow-auto dark:bg-[#0e151d]">
                                                                    <div className="edit-profile-modal pb-2">
                                                                        <form action={"#"}>
                                                                            <div className="avatar justify-center flex items-center">
                                                                                <div role="presentation" tabIndex={0}>
                                                                                    <Avatar radius="full" src="https://avatars.githubusercontent.com/u/143386751?s=200&v=4" name="Donace" className="avatar-wrapper relative w-32 h-32 cursor-pointer" />
                                                                                </div>
                                                                            </div>
                                                                            <div className="user-header-text">
                                                                                {placements.map((placement) => (
                                                                                    <Input
                                                                                        key={placement}
                                                                                        type="text"
                                                                                        label="Name"
                                                                                        labelPlacement={"outside"}
                                                                                        autoCorrect="off"
                                                                                        spellCheck="false"
                                                                                        autoCapitalize="words"
                                                                                        className="bg-transparent font-semibold mt-4 mb-2 pl-3 text-lg h-auto p-[0.375rem_0.75rem] transition-all duration-300 ease-in-out text-[#002f45] dark:text-white leading-4 rounded-lg w-full"
                                                                                        autoFocus
                                                                                        autoComplete="disable"
                                                                                        variant="bordered"
                                                                                        placeholder="Your name"
                                                                                    />
                                                                                ))}
                                                                            </div>
                                                                            <div className="lux-input-wrapper">
                                                                                {variants.map((variant) => (
                                                                                    <Textarea
                                                                                        key={variant}
                                                                                        variant={"bordered"}
                                                                                        label="Description"
                                                                                        labelPlacement={"outside"}
                                                                                        placeholder="Short Bio"
                                                                                        maxLength={140}
                                                                                        autoCapitalize="on"
                                                                                        className="bg-transparent font-semibold mt-2 mb-2 pl-3 text-lg h-auto p-[0.375rem_0.75rem] transition-all duration-300 ease-in-out text-[#002f45] dark:text-white leading-6 rounded-lg w-full"
                                                                                    />
                                                                                ))}
                                                                            </div>
                                                                            <div className="social-label dark:text-[#aec1ca]">Social Links</div>
                                                                            <div className="gap-2 flex flex-col">
                                                                                <div className="w-96 max-w-full gap-4 flex items-baseline">
                                                                                    <Instagram className="dark:text-[hsla(0,0%,100%,.5)] translate-y-0.5 flex-shrink-0 text-black-blur-light-theme block w-4 h-4 align-middle" />
                                                                                    <div className="max-w-[auto] flex-1">
                                                                                        <div className="inner-wrapper inline-block w-full">
                                                                                            <div className="input-wrapper flex items-baseline">
                                                                                                <div className="flex-1 flex items-center">
                                                                                                    <div>&nbsp;</div>
                                                                                                    <div className="accessory-text text-base h-auto p-[0.5rem_0.75rem] border-r rounded-tr-lg rounded-br-lg text-black-more-blur-light-theme dark:text-[hsla(0,0%,100%,.79)] bg-[rgba(19,21,23,0.04)] dark:bg-[rgba(255,255,255,0.08)] border border-solid rounded-lg flex items-center">instagram.com/</div>
                                                                                                    <div className="input-innter-wrapper relative flex-1">
                                                                                                        <Input
                                                                                                            placeholder="username"
                                                                                                            type="text"
                                                                                                            autoCorrect="off"
                                                                                                            spellCheck="false"
                                                                                                            className="text-base h-14 p-[0.5rem_0.75rem] donace-input m-0 pl-0.5 dark:text-white"
                                                                                                            radius="sm"
                                                                                                            variant="bordered"
                                                                                                        />
                                                                                                    </div>
                                                                                                </div>
                                                                                            </div>
                                                                                        </div>
                                                                                    </div>
                                                                                </div>
                                                                            </div>
                                                                            <div className="gap-2 flex flex-col">
                                                                                <div className="w-96 max-w-full gap-4 flex items-baseline">
                                                                                    <Twitter className="dark:text-[hsla(0,0%,100%,.5)] translate-y-0.5 flex-shrink-0 text-black-blur-light-theme block w-4 h-4 align-middle" />
                                                                                    <div className="max-w-[auto] flex-1">
                                                                                        <div className="inner-wrapper inline-block w-full">
                                                                                            <div className="input-wrapper flex items-baseline">
                                                                                                <div className="flex-1 flex items-center">
                                                                                                    <div>&nbsp;</div>
                                                                                                    <div className="accessory-text text-base h-auto p-[0.5rem_0.75rem] border-r rounded-tr-lg rounded-br-lg text-black-more-blur-light-theme dark:text-[hsla(0,0%,100%,.79)] bg-[rgba(19,21,23,0.04)] dark:bg-[rgba(255,255,255,0.08)] border border-solid rounded-lg flex items-center">twitter.com/</div>
                                                                                                    <div className="input-innter-wrapper relative flex-1">
                                                                                                        <Input
                                                                                                            placeholder="username"
                                                                                                            type="text"
                                                                                                            autoCorrect="off"
                                                                                                            spellCheck="false"
                                                                                                            className="text-base h-14 p-[0.5rem_0.75rem] donace-input m-0 pl-0.5 dark:text-white"
                                                                                                            radius="sm"
                                                                                                            variant="bordered"
                                                                                                        />
                                                                                                    </div>
                                                                                                </div>
                                                                                            </div>
                                                                                        </div>
                                                                                    </div>
                                                                                </div>
                                                                            </div>
                                                                            <div className="gap-2 flex flex-col">
                                                                                <div className="w-96 max-w-full gap-4 flex items-baseline">
                                                                                    <Youtube className="dark:text-[hsla(0,0%,100%,.5)] translate-y-0.5 flex-shrink-0 text-black-blur-light-theme block w-4 h-4 align-middle" />
                                                                                    <div className="max-w-[auto] flex-1">
                                                                                        <div className="inner-wrapper inline-block w-full">
                                                                                            <div className="input-wrapper flex items-baseline">
                                                                                                <div className="flex-1 flex items-center">
                                                                                                    <div>&nbsp;</div>
                                                                                                    <div className="accessory-text text-base h-auto p-[0.5rem_0.75rem] border-r rounded-tr-lg rounded-br-lg text-black-more-blur-light-theme dark:text-[hsla(0,0%,100%,.79)] bg-[rgba(19,21,23,0.04)] dark:bg-[rgba(255,255,255,0.08)] border border-solid rounded-lg flex items-center">youtube.com/@</div>
                                                                                                    <div className="input-innter-wrapper relative flex-1">
                                                                                                        <Input
                                                                                                            placeholder="username"
                                                                                                            type="text"
                                                                                                            autoCorrect="off"
                                                                                                            spellCheck="false"
                                                                                                            className="text-base h-14 p-[0.5rem_0.75rem] donace-input m-0 pl-0.5 dark:text-white"
                                                                                                            radius="sm"
                                                                                                            variant="bordered"
                                                                                                        />
                                                                                                    </div>
                                                                                                </div>
                                                                                            </div>
                                                                                        </div>
                                                                                    </div>
                                                                                </div>
                                                                            </div>
                                                                            <div className="gap-2 flex flex-col">
                                                                                <div className="w-96 max-w-full gap-4 flex items-baseline">
                                                                                    <FaTiktok className="dark:text-[hsla(0,0%,100%,.5)] translate-y-0.5 flex-shrink-0 text-black-blur-light-theme block w-4 h-4 align-middle" />
                                                                                    <div className="max-w-[auto] flex-1">
                                                                                        <div className="inner-wrapper inline-block w-full">
                                                                                            <div className="input-wrapper flex items-baseline">
                                                                                                <div className="flex-1 flex items-center">
                                                                                                    <div>&nbsp;</div>
                                                                                                    <div className="accessory-text text-base h-auto p-[0.5rem_0.75rem] border-r rounded-tr-lg rounded-br-lg text-black-more-blur-light-theme dark:text-[hsla(0,0%,100%,.79)] bg-[rgba(19,21,23,0.04)] dark:bg-[rgba(255,255,255,0.08)] border border-solid rounded-lg flex items-center">tiktok.com/@</div>
                                                                                                    <div className="input-innter-wrapper relative flex-1">
                                                                                                        <Input
                                                                                                            placeholder="username"
                                                                                                            type="text"
                                                                                                            autoCorrect="off"
                                                                                                            spellCheck="false"
                                                                                                            className="text-base h-14 p-[0.5rem_0.75rem] donace-input m-0 pl-0.5 dark:text-white"
                                                                                                            radius="sm"
                                                                                                            variant="bordered"
                                                                                                        />
                                                                                                    </div>
                                                                                                </div>
                                                                                            </div>
                                                                                        </div>
                                                                                    </div>
                                                                                </div>
                                                                            </div>
                                                                            <div className="gap-2 flex flex-col">
                                                                                <div className="w-96 max-w-full gap-4 flex items-baseline">
                                                                                    <Linkedin className="dark:text-[hsla(0,0%,100%,.5)] translate-y-0.5 flex-shrink-0 text-black-blur-light-theme block w-4 h-4 align-middle" />
                                                                                    <div className="max-w-[auto] flex-1">
                                                                                        <div className="inner-wrapper inline-block w-full">
                                                                                            <div className="input-wrapper flex items-baseline">
                                                                                                <div className="flex-1 flex items-center">
                                                                                                    <div>&nbsp;</div>
                                                                                                    <div className="accessory-text text-base h-auto p-[0.5rem_0.75rem] border-r rounded-tr-lg rounded-br-lg text-black-more-blur-light-theme dark:text-[hsla(0,0%,100%,.79)] bg-[rgba(19,21,23,0.04)] dark:bg-[rgba(255,255,255,0.08)] border border-solid rounded-lg flex items-center">linkedin.com</div>
                                                                                                    <div className="input-innter-wrapper relative flex-1">
                                                                                                        <Input
                                                                                                            placeholder="/in/handle"
                                                                                                            type="text"
                                                                                                            autoCorrect="off"
                                                                                                            spellCheck="false"
                                                                                                            className="text-base h-14 p-[0.5rem_0.75rem] donace-input m-0 pl-0.5 dark:text-white"
                                                                                                            radius="sm"
                                                                                                            variant="bordered"
                                                                                                        />
                                                                                                    </div>
                                                                                                </div>
                                                                                            </div>
                                                                                        </div>
                                                                                    </div>
                                                                                </div>
                                                                            </div>
                                                                            <div className="w-96 gap-4 flex items-baseline mt-2">
                                                                                <Globe className="dark:text-[hsla(0,0%,100%,.5)] translate-y-0.5 flex-shrink-0 text-black-blur-light-theme block w-4 h-4 align-middle" />
                                                                                <div className="flex-1">
                                                                                    <div className="input-wrapper flex items-baseline">
                                                                                        <div className="flex-1 flex items-center">
                                                                                            <div>&nbsp;</div>
                                                                                            <div className="input-inner-wrapper relative flex-1">
                                                                                                <Input
                                                                                                    placeholder="Your website"
                                                                                                    type="url"
                                                                                                    autoCapitalize="off"
                                                                                                    autoCorrect="off"
                                                                                                    spellCheck="false"
                                                                                                    className="text-base h-14 p-[0.5rem_0.75rem] donace-input m-0 pl-0.5 bg-transparent dark:text-white"
                                                                                                    variant="bordered"
                                                                                                />
                                                                                            </div>

                                                                                        </div>
                                                                                    </div>
                                                                                </div>
                                                                            </div>
                                                                            <div className="mt-6 mb-6">
                                                                                <div className="lux-checkbox transition-all duration-300 ease-in-out relative cursor-pointer text-base clear-both flex flex-row  justify-start items-center">
                                                                                    <label className="checkbox-icon block relative mr-2 text-xs h-5 w-5 clear-both mb-0">
                                                                                        <Checkbox />
                                                                                    </label>
                                                                                    <label className="text-label flex-1 cursor-pointer leading-6 mb-0">
                                                                                        <div className="checkbox-title font-medium text-base mb-0.5 ml-2">Compact Bio</div>
                                                                                        <div className="text-teriaty checkbox-desc text-sm ml-2 text-[#a2b7bf]">Show your avatar to the left of your name</div>
                                                                                    </label>
                                                                                </div>
                                                                            </div>

                                                                        </form>
                                                                    </div>
                                                                </ModalBody>
                                                                <ModalFooter className="border-t border-solid border-t-[#eff3f5]">
                                                                    <Button onClick={updateProfileHandle} className="text-[#fff] bg-[#0099dd] border-[#0099dd] border border-solid w-full cursor-pointer transition-all duration-300 ease-in-out donace-button mt-6 flex items-center m-0 leading-6">
                                                                        <div className="label">Save Changes</div>
                                                                    </Button>
                                                                </ModalFooter>
                                                            </>
                                                        )}
                                                    </ModalContent>
                                                </Modal>
                                                <Button onPress={onOpen} type="button" className="bg-[#a2b7bf] text-white dark:bg-[#122935] dark:text-[white] p-[0.25rem_0.75rem] font-medium border-none cursor-pointer transition-all duration-300 ease-in-out inline-flex items-center m-0" radius="full">
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
                                                                <Link href={"/create"} className="block-action pl-0 pr-0 text-[#0099dd] dark:text-[#0099dd] inline-flex items-center justify-center transition-all duration-300 ease-in-out cursor-pointer" underline="none">
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
                                                                <Link href={"/"} className="transition-all duration-300 ease-in-out text-[#0099dd] dark:text-[#0099dd] cursor-pointer" underline="none">
                                                                    View Past
                                                                </Link>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="pt-4">
                                                <Button type="button" className="bg-[#a2b7bf] dark:bg-[#122935] rounded-full p-[0.25rem_0.75rem] font-medium border-none cursor-pointer transition-all duration-300 ease-in-out inline-flex items-center m-0 leading-6 text-inherit">
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