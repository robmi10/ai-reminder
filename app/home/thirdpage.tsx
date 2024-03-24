import React from 'react'
import voice from "../../public/images/voice.jpg"
import wave from "../../public/images/soundwave.jpg"
import Image from 'next/image'


const Thirdpage = () => {
    return (
        <div className='h-screen w-screen flex flex-col justify-center items-center bg-stone-50'>
            <button className='bg-white w-1/6 shadow-lg rounded-full p-4'>Connect</button>

            <div className='flex flex-row h-2/4 w-2/4 justify-center items-center'>
                <Image alt="voice" className='rounded-2xl' src={voice} width={200} />
                <Image alt="voice" className='rounded-2xl' src={wave} width={300} />
            </div>
        </div>
    )
}

export default Thirdpage