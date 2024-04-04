import React from 'react'
import { twMerge } from 'tailwind-merge'
import { motion } from 'framer-motion'

interface props {
    recorder?: any,
    large?: boolean
}

const variantsGlobe = {
    initial: { scale: 0 },
    animate: { opacity: 1, scale: 1, transition: { duration: 0.7, ease: "easeInOut", type: 'spring' } }
}

const Globe = ({ recorder, large }: props) => {
    return (
        <motion.div variants={variantsGlobe} initial="initial" animate="animate" className={twMerge('relative mt-20 h-96 w-72',
        )}>
            <div className={twMerge('absolute z-10 left-16 bg-red-200 h-72 w-72 rounded-full opacity-100 blur-md',
                recorder && 'animate-pulse',
                large && 'h-[350px] w-[340px] left-16 md:left-0 md:h-[470px] md:w-[480px] animate-pulse'
            )} />
            <div className={twMerge('absolute z-10 left-16 md:left-0 bg-blue-200 h-64 w-64 rounded-full opacity-100 blur-lg',
                recorder && 'animate-spin',
                large && 'h-[320px] w-[320px] md:h-[420px] md:w-[420px] animate-pulse')} />
            <div className={twMerge('absolute z-30 top-10 left-20 md:left-10 bg-indigo-400 h-56 w-56 rounded-full opacity-50 blur-lg',
                recorder && 'animate-pulse',
                large && 'h-[320px] w-[320px] md:h-[400px] md:w-[400px] animate-pulse')} />
        </motion.div>
    )
}

export default Globe