import React from 'react'
import voice from "../../public/images/voice.jpg"
import wave from "../../public/images/soundwave.jpg"
import reminder from "../../public/images/reminder.jpg"
import calender from "../../public/images/calender.jpg"
import Image from 'next/image'
import Buttonanimate from '../components/animation/buttonanimate';
import { motion, useScroll, useTransform } from 'framer-motion';
import { SignInButton } from '@clerk/nextjs';


const Thirdpage = () => {
    const { scrollYProgress } = useScroll()
    const image1 = useTransform(scrollYProgress, [0, 1], [0, 0]);
    const image1Scale = useTransform(scrollYProgress, [0, 1], [0, 1]);

    const image2 = useTransform(scrollYProgress, [0, 1], [0, 0]);
    const image2Scale = useTransform(scrollYProgress, [0, 1], [0, 1]);
    return (
        <div className=' flex flex-col justify-center items-center gap-10'>
            <div className='mt-40'>
                {/* <SignInButton> */}
                <Buttonanimate login={true} title={"Connect"} />
                {/* </SignInButton> */}
            </div>
            <div className='flex flex-row h-full p-2 md:p-0 md:w-2/4 justify-center items-center mb-24'>
                <motion.div style={{ y: image1, scale: image1Scale }} >
                    <Image alt="voice" className='rounded-2xl' src={voice} width={300} />
                </motion.div>
                <motion.div style={{ y: image2, scale: image2Scale }} >
                    <Image alt="voice" className='rounded-2xl' src={wave} width={400} />
                </motion.div>
            </div>
        </div>
    )
}

export default Thirdpage