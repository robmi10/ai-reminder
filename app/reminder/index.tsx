import React, { useState } from 'react'
import { RxPencil1 } from "react-icons/rx";
import { CiTrash } from "react-icons/ci";
import { IoCheckmark } from "react-icons/io5";
import Buttonanimate from '../components/animation/buttonanimate';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { api } from '@/lib/api';
import { IoCloseOutline } from "react-icons/io5";
import { format } from "date-fns";

const Reminder = () => {
    const [modal, setModal] = useState(false);

    const [remindersObj, setRemindersObj] = useState({
        desc: '',
        reminder: '',
        start: '',

    })
    const useReminders = api.ai.getUserReminders.useQuery({ userId: 1 })
    const reminderStatusMutation = api.ai.setReminderStatus.useMutation({
        onSettled() {
            useReminders.refetch()
        }
    })
    const reminderEditMutation = api.ai.editReminder.useMutation({
        onSettled() {
            console.log("inside refetch reminderEditMutation")
            useReminders.refetch()
            setModal(false)
        }
    })
    const deleteReminderMutation = api.ai.deleteReminder.useMutation({
        onSettled() {
            console.log("it deleted now!")
        }
    })


    const handleSetReminderStatus = (eventId: number | undefined, status: boolean) => {
        if (!eventId) return null
        console.log("inside handleSetReminderStatus", status)
        reminderStatusMutation.mutate({ eventId: eventId, status }, {
            onSuccess() {
                console.log("inside refetch")
                useReminders.refetch()
            }
        })
    }

    const handleDeleteReminder = (eventId: number | undefined) => {
        if (!eventId) return null
        console.log("inside handleDeleteReminder", eventId)
        deleteReminderMutation.mutate({ eventId: eventId }, {
            onSuccess() {
                console.log("inside refetch deleted")
                useReminders.refetch()
            }
        })
    }

    const handleEditReminder = (eventId: number | undefined) => {
        if (!eventId) return null
        const startTime = new Date(`1970-01-01T${remindersObj.start}:00`);
        const reminderTime = new Date(`1970-01-01T${remindersObj.reminder}:00`);

        console.log("eventId startTime ->", startTime)
        console.log("eventId reminderTime ->", reminderTime)

        if (reminderTime < startTime) {
            console.log("Reminder is earlier than start time.");
            reminderEditMutation.mutate({ eventId: eventId, desc: remindersObj.desc, timeStart: remindersObj.start, timeReminder: remindersObj.reminder }, {
                onSuccess() {
                    console.log("inside refetch")
                    useReminders.refetch()
                }
            })
        } else if (reminderTime > startTime || reminderTime === startTime) {
            console.error("Reminder is later than start time or the same.");
        }


    }

    const reminders = useReminders.data && useReminders?.data

    return (
        <div className='h-full w-full flex items-center justify-center flex-col gap-12'>
            <div className='text-2xl font-medium w-full flex items-center justify-center'>Reminders</div>
            <div className='absolute top-0 p-8 left-8'>
                <Buttonanimate back={true} />
            </div>


            <div className='place-items-center w-2/4 h-full grid grid-cols-2 gap-8 '>
                {reminders && reminders.map((opts, index) => {
                    const startDate = format(new Date(opts.start), "yyyy-MM-dd HH:mm");
                    const reminderDate = format(new Date(opts.reminder), "yyyy-MM-dd HH:mm");
                    return (
                        <div key={index} className='w-full bg-white h-54 p-8 gap-2 flex flex-col shadow-lg rounded-xl relative'>
                            <div className='absolute right-2 justify-end flex'>
                                <div className='flex gap-2'>
                                    <Dialog open={modal} onOpenChange={setModal} >
                                        <DialogTrigger asChild className='w-full relative'>
                                            <RxPencil1 className='cursor-pointer absolute w-full right-0 top-0' />
                                        </DialogTrigger>
                                        <DialogContent className='bg-white rounded-xl p-8 shadow-2xl'>
                                            <span className='text-xl'>Edit Reminder</span>

                                            <div>
                                                <span className='text-sm'>Description</span>
                                                <Input value={remindersObj.desc} onChange={(e) => { setRemindersObj(current => ({ ...current, desc: e.target.value })) }} type='text' placeholder="Desc" className='rounded-3xl border-stone-200 shadow-3xl placeholder:text-stone-400' />
                                            </div>

                                            <div>
                                                <span className=' text-sm'>Task time</span>
                                                <Input value={remindersObj.start} onChange={(e) => { setRemindersObj(current => ({ ...current, start: e.target.value })) }} type='time' placeholder="Task time" className='rounded-3xl border-stone-200 shadow-3xl placeholder:text-stone-400' />
                                            </div>

                                            <div>
                                                <span className=' text-sm'>Reminder time</span>
                                                <Input value={remindersObj.reminder} onChange={(e) => { setRemindersObj(current => ({ ...current, reminder: e.target.value })) }} type='time' placeholder="Reminder " className='rounded-3xl border-stone-200 shadow-3xl placeholder:text-stone-400' />
                                            </div>
                                            <div className='flex gap-4 justify-end'>
                                                <Button className='border border-slate-100 shadow-2xl rounded-3xl h-8 bg-gray-500 text-white hover:bg-gray-800 transition-colors duration-500'>CANCEL</Button>
                                                <Button onClick={() => { handleEditReminder(opts.eventId) }} className='border border-slate-100 shadow-2xl rounded-3xl h-8 bg-gray-500 text-white hover:bg-gray-800 transition-colors duration-500'>SUBMIT</Button>
                                            </div>
                                        </DialogContent>
                                    </Dialog>

                                    <Dialog>
                                        <DialogTrigger asChild className='w-full relative'>
                                            <CiTrash className='cursor-pointer absolute w-full right-0 top-0' />
                                        </DialogTrigger>
                                        <DialogContent className='bg-white rounded-xl p-8 shadow-2xl'>
                                            <span className='text-xl'>Delete Reminder?</span>
                                            <DialogDescription>
                                                This action cannot be undone. This will permanently delete your reminder.
                                            </DialogDescription>
                                            <div className='flex gap-4'>
                                                <Button onClick={() => { handleDeleteReminder(opts.eventId) }} className='border border-slate-100 shadow-2xl rounded-3xl h-8 bg-gray-500 text-white hover:bg-gray-800 transition-colors duration-500'>YES</Button>
                                                <Button className='border border-slate-100 shadow-2xl rounded-3xl h-8 bg-gray-500 text-white hover:bg-gray-800 transition-colors duration-500'>NO</Button>
                                            </div>
                                        </DialogContent>
                                    </Dialog>
                                </div></div>
                            <div className='flex flex-col'>
                                <span className='font-medium'>Desc</span>
                                <span>{opts.desc}</span>
                            </div>
                            <div className='flex flex-col'>
                                <span className='font-medium'>Start</span>
                                <span>{startDate}</span>
                            </div>
                            <div className='flex flex-col'>
                                <span className='font-medium'>Reminder</span>
                                <span>{reminderDate}</span>
                            </div>

                            {!opts.status && <div className='absolute right-2 bottom-8 justify-end flex cursor-pointer' onClick={() => {
                                handleSetReminderStatus(opts.eventId, !opts.status)
                            }}><IoCheckmark size={20} /></div>}
                            {opts.status && <div className='absolute right-2 bottom-8 justify-end flex cursor-pointer' onClick={() => {
                                handleSetReminderStatus(opts.eventId, !opts.status)
                            }}><IoCloseOutline size={20} /></div>}
                        </div>
                    )
                }


                )}

            </div>

        </div >
    )
}

export default Reminder