import React, { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { GoArrowUpRight } from "react-icons/go";

interface props {
    title: string
}

const Buttonanimate = ({ title }: props) => {
    const [isHover, setIsHover] = useState(false)

    const variants = {
        initial: { scale: 0, opacity: 0 },
        animate: { scale: 1, opacity: 1, transition: { type: "spring", duration: 0.3, ease: "easeInOut" } },
        exit: { scale: 0, opacity: 0, transition: { duration: 0.3, ease: "easeInOut" } },
    };

    const textVariants = {
        hover: { x: -10, opacity: 1, transition: { duration: 0.3, ease: "easeInOut" } },
        initial: { x: 0, opacity: 1 },
    };

    const iconVariants = {
        hover: { scale: 1, opacity: 1, transition: { duration: 0.3, ease: "easeInOut" } },
        initial: { scale: 0, opacity: 1 },
    };

    return (
        <div className='relative'>
            <motion.button
                onMouseEnter={() => { setIsHover(true) }}
                onMouseLeave={() => { setIsHover(false) }}
                whileHover="hover" className='relative h-12 w-36 rounded-full flex z-5 justify-center items-center border bg-gray-500 text-white'>
                <motion.span variants={textVariants} animate={isHover ? "hover" : "initial"} className='flex z-20 items-center h-full'
                >
                    {title}</motion.span>
                <motion.span variants={iconVariants} animate={isHover ? "hover" : "initial"} className='flex absolute right-5 z-20 items-center h-full'
                >
                    <GoArrowUpRight />
                </motion.span>

            </motion.button >
            <AnimatePresence>
                {isHover && <motion.button whileHover="hover"
                    className='absolute top-0 z-10 h-12 w-36 rounded-full flex justify-center items-center bg-gray-800'
                    initial="initial"
                    animate="animate"
                    exit="initial"
                    variants={variants
                    }>
                </motion.button >}
            </AnimatePresence>
        </div >
    )
}

export default Buttonanimate