import React from 'react'
import { FaArrowTurnDown } from "react-icons/fa6";
import { IoIosArrowDown } from "react-icons/io";

import Globe from '../components/animation/globe';


const Firstpage = () => {
    return (
        <div className="h-screen flex justify-center items-center w-full flex-col gap-8">
            <div className='absolute top-0 w-full h-full flex items-center justify-center z-0 right-24'>
                <Globe large={true} />
            </div>
            <div className='bg-slate-50 shadow-2xl rounded-3xl p-6 gap-2 flex flex-col z-10'>
                <span className="text-2xl flex justify-center font-medium z-10" > WELCOME TO AI REMINDER</span>

                <span className="rounded-2xl z-10 flex justify-center">
                    Your Personal Reminder Assistant, Powered by AI
                </span>
            </div>
            <IoIosArrowDown className="animate-bounce mt-12" size={50} />
        </div>
    )
}

export default Firstpage