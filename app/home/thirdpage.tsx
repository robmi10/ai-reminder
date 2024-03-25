import React from 'react'
import voice from "../../public/images/voice.jpg"
import wave from "../../public/images/soundwave.jpg"
import Image from 'next/image'
import Buttonanimate from '../components/animation/buttonanimate';
import { motion, useScroll, useTransform } from 'framer-motion';


const Thirdpage = () => {
    const { scrollYProgress } = useScroll()
    const image1 = useTransform(scrollYProgress, [0, 1], [0, -150]);
    const image1Scale = useTransform(scrollYProgress, [0, 1], [0, 1]);

    const image2 = useTransform(scrollYProgress, [0, 1], [0, -150]);
    const image2Scale = useTransform(scrollYProgress, [0, 1], [0, 1]);
    return (
        <div className='h-screen w-screen flex flex-col justify-center items-center bg-stone-50'>
            <div className='mt-44'>
                <Buttonanimate title={"Connect"} />
            </div>
            <div className='flex flex-row h-full w-2/4 justify-center items-center mt-24 '>
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