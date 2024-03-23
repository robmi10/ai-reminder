import React, { useEffect, useRef } from 'react'
import { motion, useAnimation } from "framer-motion"
import { useScroll, useTransform } from "framer-motion"
import { useInView } from "react-intersection-observer"; // Assuming useInView is from react-intersection-observer

const Description = ({ children }) => {
    const { scrollYProgress } = useScroll({ target: horizontalRef })

    const y = useTransform(scrollYProgress, [0, 1], ["5%", "-300%"])
    const controls = useAnimation();
    // const [ref, inView] = useInView({
    //     triggerOnce: true,
    //     rootMargin: '-100px 0px',
    // });

    const boxFirst = useTransform(scrollYProgress, [0, 1], [1, 4]);
    const boxSecond = useTransform(scrollYProgress, [0, 1], [1, 4]);
    const boxThird = useTransform(scrollYProgress, [0, 1], [1, 4]);


    useEffect(() => {
        if (inView) {
            controls.start({
                x: 0,
                opacity: 1,
                transition: { duration: 0.9, ease: "easeOut" },
            });
        }
    }, [controls, inView]);



    return (
        <motion.div
            ref={ref}
            initial={{ x: 200, opacity: 0 }}
            animate={controls}
            className="w-full p-8 rounded-2xl shadow-lg font-medium items-center flex bg-white border">
            {children}
        </motion.div>
    )
}

const Secondpage = () => {
    return (
        <div className="h-screen sticky top-0 left-0 bg-stone-50 p-44 w-screen flex items-center justify-center flex-col">
            <div className="flex space-x-18">
                <span className="text-2xl w-full font-medium items-center justify-center flex">Why AI Reminder?</span>
                <div className="flex gap-6 flex-col">
                    <Description>  No typing, no fuss. Just say what's on your mind.
                    </Description>
                    <Description >
                        More than just alarms. Get reminders that understand the context.
                    </Description>
                    <Description >
                        Save time and mental energy. Focus on what truly matters, while AI Reminder takes care of the rest.
                    </Description>

                </div>

            </div >
        </div >
    )
}

export default Secondpage