'use client';
import { Player } from '@lottiefiles/react-lottie-player';
import Animation from '../Animation-payment.json'
import { Link } from '@nextui-org/link';
import { Button } from '@nextui-org/react';

export default function ReturnPaymentURL() {
    return (
        <div className="page-content max-w-[100dvw] overflow-x-hidden">
            <div className="zm-container flex items-center relative gap-4 p-4 pt-12 justify-between max-width-global margin-global">
                <div className="content flex-shrink">
                    <h1 className="text-3xl font-medium -space-x-px mt-0 mb-2">
                        <div className='title'>Đã thanh toán thành công!</div>
                    </h1>
                    <div className='desc max-w-sm mb-4'>
                        <div className='content'>
                            <span className='text-base'>Cảm ơn bạn đã hoàn thành thanh toán mua vé sự kiện!</span>
                            <br></br>
                            <span className='text-base'>
                                Nếu có bất kỳ câu hỏi hoặc yêu cầu nào thêm, đừng ngần ngại liên hệ với chúng tôi. Cảm ơn bạn một lần nữa và hẹn gặp lại!
                            </span>
                        </div>
                    </div>
                    <div className="buttons mt-2 text-xl max-w-sm">
                        <Button
                            radius='lg'
                            as={Link}
                            type='button'
                            href='/create'
                            className='font-normal text-base mr-2 bg-[rgb(30,137,77)] text-[#fff] font-sans'
                        >
                            Tạo một Sự kiện mới
                        </Button>
                        <Button
                            radius='lg'
                            as={Link}
                            type='button'
                            href='/home'
                            className='font-normal text-base mr-2 bg-[#fff] border-2 border-solid border-[rgb(30,137,77)] text-[rgb(30,137,77)] font-sans'
                        >
                            Trang chủ
                        </Button>
                    </div>
                </div>
                <div className="phone flex-shrink-0 relative -mr-36">
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