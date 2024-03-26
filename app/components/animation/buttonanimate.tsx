import React, { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { GoArrowUpRight, GoArrowUpLeft, FiArrowLeft } from "react-icons/go";
import { twMerge } from 'tailwind-merge';

interface props {
    title?: string,
    back: boolean
}

const Buttonanimate = ({ title, back }: props) => {
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

    const iconVariantsback = {
        hover: { scale: 1, opacity: 1, transition: { duration: 0.3, ease: "easeInOut" } },
        initial: { scale: 1, opacity: 1 },
    };

    return (
        <div className='relative'
            onMouseEnter={() => { setIsHover(true) }}
            onMouseLeave={() => { setIsHover(false) }}>
            <motion.button
                whileHover="hover" className={twMerge('relative h-12 w-36 rounded-full flex z-5 justify-center items-center border bg-gray-500 text-white',
                    back && 'h-12 w-12')}>
                {!back && <motion.span variants={textVariants} animate={isHover ? "hover" : "initial"} className='flex z-20 items-center h-full'
                >
                    {title}</motion.span>}

                {back && !isHover && <GoArrowUpLeft size={15} />}
            </motion.button >
            <AnimatePresence>
                {isHover && <motion.button whileHover="hover"
                    className={twMerge('absolute top-0 z-10 h-12 w-36 rounded-full flex justify-center items-center bg-gray-800',
                        back && 'h-12 w-12')}
                    initial="initial"
                    animate="animate"
                    exit="initial"
                    variants={variants
                    }>
                    <motion.span variants={!back ? iconVariantsback : iconVariants} animate={isHover ? "hover" : "initial"} className={twMerge('flex z-20 items-center h-full text-white',
                    )}
                    >
                        {!back ? <GoArrowUpRight /> : <GoArrowUpLeft size={25} />}
                    </motion.span>
                </motion.button >}
            </AnimatePresence>
        </div >
    )
}

export default Buttonanimate