import React from 'react'

const cardContent = [
    { title: "No typing, no fuss. Just say what's on your mind.", px: "-200px" },
    { title: "More than just alarms. Get reminders that understand the context.", px: "-400px" },
    { title: "Save time and mental energy. Focus on what truly matters, while AI Reminder takes care of the rest.", px: "-600px" }
]

const Description = ({ children }) => {

    return (
        <div
            className="w-full h-[30vh] sticky top-40 left-0 p-8 rounded-2xl shadow-lg font-medium items-center flex bg-white">
            {children}
        </div>
    )
}
const Secondpage = () => {
    return (
        <div className="h-[200vh] w-screen bg-stone-50 flex items-center justify-center flex-col">
            <div className="flex space-x-18">
                <span className="text-2xl sticky top-20 left-0 w-full h-[50vh] items-center font-medium items-top justify-center flex">Why AI Reminder?</span>
                <div className="flex gap-16 flex-col">
                    {cardContent.map((card) => {
                        return (
                            <Description>{card.title}</Description>
                        )
                    })}

                </div>

            </div >
        </div >
    )
}

export default Secondpage