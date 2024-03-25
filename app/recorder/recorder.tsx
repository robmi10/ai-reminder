import { Button } from '@/components/ui/button'
import { SignOutButton } from '@clerk/nextjs'
import React from 'react'
import VoiceRecognition from '../components/speechrecorder'


const Recorder = () => {
    return (

        <div className='h-full space-y-40 items-center flex flex-col'>
            <span className='w-3/4 flex justify-center items-center mt-24 text-2xl font-medium'>
                Capture Your Reminders in a Snap</span>
            {/* 
            <span className='w-3/4 flex justify-center items-center text-xl'>
                Record your</span> */}

            <VoiceRecognition />
        </div>

    )
}

export default Recorder