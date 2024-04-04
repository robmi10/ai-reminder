import React from 'react'
import { IoIosArrowDown } from "react-icons/io";

import Globe from '../components/animation/globe';


const Firstpage = () => {
    return (
        <div className="h-screen flex justify-center items-center w-full flex-col gap-8 md:p-0 p-8">
            <div className='absolute top-0 w-full h-full flex items-center justify-center z-0 right-24'>
                <Globe large={true} />
            </div>
            <div className='bg-slate-50 shadow-2xl rounded-3xl p-6 gap-1 flex flex-col z-10 md:w-3/12 items-center'>
                <span className="text-xl md:text-2xl flex justify-center font-medium z-10" > WELCOME TO AI REMINDER</span>

                <span className="text-sm rounded-2xl z-10 flex justify-center items-center">
                    Your Personal Reminder Assistant,
                </span>
                <span className="text-sm rounded-2xl z-10 flex justify-center items-center">
                    Powered by AI
                </span>
            </div>
            <IoIosArrowDown className="animate-bounce mt-12 text-stone-50 rounded-full border border-stone-50 p-3 shadow-2xl" size={50} />
        </div>
    )
}

export default Firstpage