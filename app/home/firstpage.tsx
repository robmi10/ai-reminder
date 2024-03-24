import React from 'react'
import { CiAlarmOn } from "react-icons/ci";
import { FaArrowTurnDown } from "react-icons/fa6";


const Firstpage = () => {
    return (
        <div className="h-[620px] flex p-44 items-center w-full flex-col space-y-16">
            <span className="text-2xl w-2/4 pl-8 font-medium" > WELCOME TO AI REMINDER</span>

            <span className="bg-white shadow-lg w-2/4 h-24 p-8 rounded-2xl">
                Your Personal Reminder Assistant, Powered by AI
            </span>
            <FaArrowTurnDown className="w-2/4 animate-pulse items-start flex" size={400} />
        </div>
    )
}

export default Firstpage