import { Button } from '@/components/ui/button';
import { api } from '@/lib/api'
import React, { useState } from 'react'
import { IoIosCheckmarkCircle } from "react-icons/io";

const Reminders = () => {
    const [eventId, setEventId] = useState(0)
    const useReminders = api.ai.getUserReminders.useQuery({ userId: 1 })
    const reminderStatusMutation = api.ai.setReminderStatus.useMutation({
        onSettled() {
            console.log("it settled now!")
        }
    })
    const handleSetReminderStatus = (eventId: number | undefined) => {
        if (!eventId) return null
        reminderStatusMutation.mutate({ eventId: eventId }, {
            onSuccess() {
                useReminders.refetch()
            }
        })
    }
    const reminders = useReminders.data && useReminders?.data
    console.log("reminders check ->", reminders)

    return (
        <div className='w-full h-full grid grid-cols-2 justify-center p-8 text-sm border border-black rounded-3xl gap-4 overflow-auto'>
            <span >ALL REMINDERS HERE</span>
            {reminders && reminders.map((opts) => (
                <div className='flex gap-4 flex-col border border-black p-4'>
                    <div className='flex gap-2'>
                        <span>ID:</span>
                        <span>{opts.eventId}</span>
                    </div>
                    <div className='flex gap-2'>
                        <span>START:</span>
                        <span>{opts.start}</span>
                    </div>
                    <div className='flex gap-2'>
                        <span>DESC:</span>
                        <span>{opts.desc}</span>
                    </div>

                    <div className='flex gap-2'>
                        <span>REMINDER:</span>
                        <span>{opts.reminder}</span>
                    </div>

                    {!opts.status && <Button onClick={() => {
                        handleSetReminderStatus(opts.eventId)
                    }}><IoIosCheckmarkCircle size={30} /></Button>}
                    {opts.status && <Button onClick={() => {
                        handleSetReminderStatus(opts.eventId)
                    }}><IoIosCheckmarkCircle size={30} /></Button>}

                </div>
            ))}
        </div>
    )
}

export default Reminders