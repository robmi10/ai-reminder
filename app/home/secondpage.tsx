import React, { useEffect, useRef } from 'react'
import { motion, useAnimation } from "framer-motion"
import { useScroll, useTransform } from "framer-motion"
import { useInView } from 'react-intersection-observer';

const Description = ({ children, px }) => {
    const controls = useAnimation();
    const [ref, isInView] = useInView({

        threshold: 0.1, // Trigger when 10% of the element is in view
        triggerOnce: true, // Animation triggers once
        rootMargin: `0px 0px ${px} 0px`, // Adjusts when the animation is triggered
    });

    useEffect(() => {
        if (isInView) {
            controls.start({ x: 0, opacity: 1, transition: { duration: 0.9, ease: "easeOut" } });

        }
    }, [controls, isInView])



    return (
        <motion.div
            ref={ref}
            initial={{ x: 400, opacity: 0 }}
            animate={controls}
            className="w-full p-8 rounded-2xl shadow-lg font-medium items-center flex bg-white border">
            {children}
        </motion.div>
    )
}

const Secondpage = () => {
    return (
        <div className="h-[1500px] sticky top-0 left-0 bg-blue-50 p-44 w-screen flex items-center justify-center flex-col">
            <div className="flex space-x-18">
                <span className="text-2xl w-full font-medium items-center justify-center flex">Why AI Reminder?</span>
                <div className="flex gap-16 flex-col">
                    <Description px={"-200px"}>  No typing, no fuss. Just say what's on your mind.
                    </Description>
                    <Description px={"-500px"}>
                        More than just alarms. Get reminders that understand the context.
                    </Description>
                    <Description px={"-700px"}>
                        Save time and mental energy. Focus on what truly matters, while AI Reminder takes care of the rest.
                    </Description>

                </div>

            </div >
        </div >
    )
}

export default Secondpage