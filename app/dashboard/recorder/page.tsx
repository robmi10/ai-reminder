"use client"
import React, { useEffect } from 'react'
import VoiceRecognition from '../../components/speechrecorder'
import Reminder from '../reminder/page'
import { useReminderStore } from '@/zustand/reminderstore'
import Buttonanimate from '../../components/animation/buttonanimate'
import { useRouter } from 'next/navigation'

const Recorder = () => {
    const { transcription, reminder, setReminder } = useReminderStore()
    const router = useRouter()

    useEffect(() => {
        if (reminder) {
            console.log("go to -> dashboard/reminder")
            router.push('/dashboard/reminder')
            setReminder(false)
        }
    }, [reminder, router])

    console.log("transcription ->", transcription)
    return (
        <div className='p-4 pt-16 items-center flex flex-col'>
            <div className='absolute top-0 p-8 left-8'>
                <Buttonanimate href="/dashboard/reminder" front={true} />
                <span className='text-xs'>Go to reminders</span>
            </div>
            <span className='w-3/4 flex justify-center items-center text-xl font-medium'>
                Capture Your Reminders in a Snap</span>
            <VoiceRecognition />
        </div>
    )
}
export default Recorder