import React, { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { GoArrowUpRight, GoArrowUpLeft, } from "react-icons/go";
import { BiSolidBellRing } from "react-icons/bi";
import { twMerge } from 'tailwind-merge';
import { useRouter } from 'next/navigation';
import { SignInButton } from '@clerk/nextjs';

interface props {
    title?: string,
    back?: boolean,
    front?: boolean,
    href?: string
    login?: boolean
}

const Buttonanimate = ({ title, back, front, href, login }: props) => {
    const [isHover, setIsHover] = useState(false)
    const router = useRouter();

    const handleButtonClick = () => {
        if (href) {
            router.push(href);
        }
    };


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
            {!login && <motion.button
                onClick={() => { console.log("button animate pressed") }}
                whileHover="hover" className={twMerge('relative h-12 w-36 rounded-full flex z-5 justify-center items-center border bg-gray-500 text-white',
                    (back || front) && 'h-12 w-12')}>
                {!back && <motion.span variants={textVariants} animate={isHover ? "hover" : "initial"} className='flex z-20 items-center h-full'
                >
                    {title}</motion.span>}

                {back && !front && !isHover && <GoArrowUpLeft size={15} />}
                {front && !back && !isHover && <BiSolidBellRing size={14} />}

            </motion.button >}

            {login &&
                <SignInButton>
                    <motion.button
                        onClick={() => { console.log("button animate pressed") }}
                        whileHover="hover" className={twMerge('relative h-12 w-36 rounded-full flex z-5 justify-center items-center border bg-gray-500 text-white',
                            (back || front) && 'h-12 w-12')}>
                        {!back && <motion.span variants={textVariants} animate={isHover ? "hover" : "initial"} className='flex z-20 items-center h-full'
                        >
                            {title}</motion.span>}

                        {back && !front && !isHover && <GoArrowUpLeft size={15} />}
                        {front && !back && !isHover && <BiSolidBellRing size={14} />}
                    </motion.button >
                </SignInButton>}
            <AnimatePresence>
                {isHover && <motion.button
                    whileHover="hover"
                    className={twMerge('absolute top-0 z-10 h-12 w-36 rounded-full flex justify-center items-center bg-gray-800',
                        (back || front) && 'h-12 w-12')}
                    initial="initial"
                    animate="animate"
                    exit="initial"
                    variants={variants
                    }>
                    {<motion.span onClick={handleButtonClick} variants={iconVariants} animate={isHover ? "hover" : "initial"} className={twMerge('flex z-20 items-center h-full text-white',
                        !back && !front && 'absolute right-5'
                    )}
                    >
                        {!back ? <GoArrowUpRight size={25} /> : <GoArrowUpLeft size={25} />}
                    </motion.span>}
                </motion.button >}
            </AnimatePresence>
        </div >
    )
}

export default Buttonanimate