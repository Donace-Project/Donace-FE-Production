"use client";
import { Link } from "@nextui-org/link";
import React from 'react'
import NavbarLanding from "@/components/navbarLandingPage";
import { TypeAnimation } from "react-type-animation";
import { Player } from '@lottiefiles/react-lottie-player';
import Animation from '../components/animation_loil366f.json'

export default function Home() {
	return (
		<div className="page-wrapper pb-0 gradient-background">
			<NavbarLanding />
			<div className="page-content max-w-[100dvw] overflow-x-hidden">
				<div className="zm-container min-h-[80vh] flex flex-col md:flex-row items-center gap-4 p-4 pt-12 justify-between max-width-global margin-global">
					<div className="content flex-shrink">
						<div className="logo text-[hsla(0,0%,100%,.5)] mb-1 md:mb-6 ml-1.5">
							<p className="md:text-left text-center label md:text-2xl text-1xl">DONACE</p>
						</div>
						<div className="font-medium -space-x-px mt-0 mb-4 flex flex-col gap-4" >
							<div className="md:text-7xl text-3xl md:text-left text-center">
								<TypeAnimation
									cursor={false}
									sequence={[
										'Tạo Sự Kiện',
										5000,
										'Tạo Lịch',
										6000,
									]}
									wrapper="span"
									speed={40}
									style={{ display: 'inline-block', color: '#f2f3f4', fontWeight: 'bold' }}
									repeat={Infinity}
								/>
							</div>
							<div className="md:text-left text-center text-2xl">
								<TypeAnimation
									cursor={false}
									sequence={[
										'đặc sắc',
										10000,
										'thú vị',
										5000,
										'hấp dẫn',
										5000
									]}
									wrapper="span"
									speed={40}
									style={{ display: 'inline-block', color: '#f2f3f4' }}
									repeat={Infinity}
								/>
							</div>
							<div className="md:text-base md:text-left text-center text-xl">
								<TypeAnimation
									cursor={false}
									sequence={[
										'dành riêng cho bạn',
										5000,
										'dành cho cả cộng đồng',
										5000,
									]}
									wrapper="span"
									speed={40}
									style={{ display: 'inline-block', color: '#f2f3f4', whiteSpace: 'pre-line', paddingBottom: '16px' }}
									repeat={Infinity}
								/>
							</div>
							{/* <div className="start-here font-sans mt-2 ml-2 pb-4 hidden md:block">Bắt đầu ngay.</div> */}

						</div>
						<div className="desc mt-2 text-xl max-w-sm text-[hsla(0,0%,100%,.79)]">
							Tạo một sự kiện, mời bạn bè và cùng nhau tham dự. Hãy cùng nhau tạo kỷ niệm ngay hôm nay.
						</div>
						<Link
							href="/create"
							target="_self"
							className="text-[rgb(19,21,23)] bg-[#fff] border-[#fff] border border-solid mt-8 transition-all duration-300 ease-in-out donace-button flex items-center cursor-pointer"
							underline="none"
						>
							<div className="label">Tạo một event mới</div>
						</Link>
					</div>
					<div className="">
						<Player
							autoplay
							loop
							src={Animation}
							style={{ height: '400px', width: '400px' }}
						>
						</Player>
					</div>
				</div>
			</div>
		</div>

	)
}
