"use client";
import { Link } from "@nextui-org/link";
import React from 'react'
import { TypeAnimation } from "react-type-animation";
import { Player } from '@lottiefiles/react-lottie-player';
import Animation from '../components/animation_loil366f.json'
import { Button } from "@nextui-org/button";
import LogoDonace from "@/public/doanLogo.png";

export default function Home() {
	return (
		// <div className="page-wrapper pb-0 gradient-background">

		<div className="page-content">
			<div className="zm-container m-auto md:min-h-[80vh] flex flex-col md:flex-row items-center gap-4 p-4 justify-center">
				<div className="flex flex-col md:items-baseline justify-center mt-10 lg:mt-0">
					<div className=" mb-1 md:mb-3 inline-flex gap-2 items-center md:justify-start justify-between m-auto md:mx-0">
						<img src={LogoDonace.src} className="w-8 h-8 rounded-full" />
						<p className="md:text-left text-center label md:text-2xl text-1xl">Donace</p>
					</div>
					<div className="font-medium mb-4 flex flex-col gap-4 " >
						<div className="lg:text-4xl text-3xl md:text-left text-center w-[450px] h-[30px]">
							<TypeAnimation
								cursor={false}
								sequence={[
									'TỔ CHỨC SỰ KIỆN',
									5000,
									'THAM GIA HOẠT ĐỘNG',
									6000,

								]}
								wrapper="span"
								speed={40}
								style={{ display: 'inline-block', fontWeight: 'bold', color: "orange" }}
								repeat={Infinity}
							/>
						</div>
						<div className="md:text-left text-center text-2xl h-[30px]">
							<TypeAnimation
								cursor={false}
								sequence={[
									'ĐẶC SẮC',
									10000,
									'THÚ VỊ',
									5000,
									'HẤP DẪN',
									5000
								]}
								wrapper="span"
								speed={40}
								style={{ display: 'inline-block' }}
								repeat={Infinity}
							/>
						</div>
						<div className="md:text-base md:text-left text-center text-xl h-[30px]">
							<TypeAnimation
								cursor={false}
								sequence={[
									'DÀNH RIÊNG CHO BẠN',
									5000,
									'CÙNG CẢ CỘNG ĐỒNG',
									5000,
								]}
								wrapper="span"
								speed={40}
								style={{ display: 'inline-block', whiteSpace: 'pre-line', paddingBottom: '16px' }}
								repeat={Infinity}
							/>
						</div>
						{/* <div className="start-here font-sans mt-2 ml-2 pb-4 hidden md:block">Bắt đầu ngay.</div> */}

					</div>
					<div className="mt-2 mx-auto md:mx-0 md:text-xl max-w-sm">
						Tạo một sự kiện, mời bạn bè và cùng nhau tham dự. Hãy cùng nhau tạo kỷ niệm ngay hôm nay.
					</div>
					<Link className="mt-8 mx-auto md:mx-0"
						href="/create"
						target="_self"
						color="foreground"
						underline="none"
					>
						<Button variant="shadow" color="warning">
							<div className="label font-bold">Tạo một event mới</div>
						</Button>
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


	)
}
