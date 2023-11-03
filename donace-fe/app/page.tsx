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
				<div className="zm-container min-h-[80vh] flex items-center relative gap-4 p-4 pt-12 justify-between max-width-global margin-global">
					<div className="content flex-shrink">
						<div className="logo text-[hsla(0,0%,100%,.5)] mb-6 ml-1.5">
							<p className="label">DONACE</p>
						</div>
						<h1 className="text-7xl font-medium -space-x-px mt-0 mb-4">
							<div>
								<TypeAnimation
									cursor={false}
									sequence={[
										'Tạo Sự kiện',
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
							<div>

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
									style={{ display: 'inline-block', color: '#f2f3f4', fontSize: '40px' }}
									repeat={Infinity}
								/>
							</div>
							<div>
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
									style={{ display: 'inline-block', color: '#f2f3f4', fontSize: '40px', whiteSpace: 'pre-line', paddingBottom: '16px' }}
									repeat={Infinity}
								/>
							</div>
							<div className="start-here font-sans mt-2 ml-2 pb-4">bắt đầu ngay.</div>
						</h1>
						<div className="desc mt-2 text-xl max-w-sm text-[hsla(0,0%,100%,.79)]">
							Tạo một sự kiện, mời bạn bè và cùng nhau tham dự. Hãy cùng nhau tạo kỷ niệm ngay hôm nay.
						</div>
						<Link
							href="/create"
							target="_self"
							className="text-[rgb(19,21,23)] bg-[#fff] border-[#fff] border border-solid mt-8 transition-all duration-300 ease-in-out donace-button flex items-center cursor-pointer"
							underline="none"
						>
							<div className="label">Tạo mới một event ngay</div>
						</Link>
					</div>
					<div className="phone flex-shrink-0 relative -mr-36">
						<Player
							autoplay
							loop
							src={Animation}
							style={{ height: '400px', width: '400px' }}
						>
						</Player>
						{/* <Image src="https://nextui-docs-v2.vercel.app/images/hero-card-complete.jpeg" width={350} /> */}
					</div>
				</div>
			</div>
		</div>
		// <div>
		// 	<section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10">
		// 		<div className="inline-block max-w-lg text-center justify-center">
		// 			<h1 className={title()}>Make&nbsp;</h1>
		// 			<h1 className={title({ color: "violet" })}>beautiful&nbsp;</h1>
		// 			<br />
		// 			<h1 className={title()}>
		// 				websites regardless of your design experience.
		// 			</h1>
		// 			<h2 className={subtitle({ class: "mt-4" })}>
		// 				Beautiful, fast and modern React UI library.
		// 			</h2>
		// 		</div>

		// 		<div className="flex gap-3">
		// 			<Link
		// 				isExternal
		// 				as={NextLink}
		// 				href={siteConfig.links.docs}
		// 				className={buttonStyles({ color: "primary", radius: "full", variant: "shadow" })}
		// 			>
		// 				Documentation
		// 			</Link>
		// 			<Link
		// 				isExternal
		// 				as={NextLink}
		// 				className={buttonStyles({ variant: "bordered", radius: "full" })}
		// 				href={siteConfig.links.github}
		// 			>
		// 				<GithubIcon size={20} />
		// 				GitHub
		// 			</Link>
		// 		</div>
		// 		<div className="mt-8">
		// 			<Snippet hideSymbol hideCopyButton variant="flat">
		// 				<span>
		// 					Get started by editing <Code color="primary">app/page.tsx</Code>
		// 				</span>
		// 			</Snippet>
		// 		</div>
		// 	</section>
		// </div>
	)
}
