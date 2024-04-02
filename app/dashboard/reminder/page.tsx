"use client"
import React, { useState } from 'react'
import { RxPencil1 } from "react-icons/rx";
import { CiTrash } from "react-icons/ci";
import { IoCheckmark } from "react-icons/io5";
import Buttonanimate from '../../components/animation/buttonanimate';
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
import { motion } from 'framer-motion'
import { convertLocalTimeToUTCSimple } from '@/lib/utils/date';
import { useToast } from "@/components/ui/use-toast"
import Loading from '@/app/components/loader/loading';


const Reminder = () => {
    const [modal, setModal] = useState(false);
    const { toast } = useToast()

    const [remindersObj, setRemindersObj] = useState({
        desc: '',
        reminder: '',
        start: '',
        eventId: 0
    })
    const [reminders, useReminders] = api.ai.getUserReminders.useSuspenseQuery({ userId: 1 })
    const reminderStatusMutation = api.ai.setReminderStatus.useMutation({
        onSettled() {
            useReminders.refetch()
        }
    })

    const iconVariants = {
        initial: { scale: 0, opacity: 0 },
        animate: { scale: 1, opacity: 1, transition: { type: "spring", duration: 0.5, ease: "easeInOut" } },
    };


    const reminderEditMutation = api.ai.editReminder.useMutation({
        onSettled() {
            useReminders.refetch()
            setModal(false)
        }
    })
    const deleteReminderMutation = api.ai.deleteReminder.useMutation({

    })


    const handleSetReminderStatus = (eventId: number | undefined, status: boolean) => {
        if (!eventId) return false
        console.log("inside handleSetReminderStatus", status, eventId)
        reminderStatusMutation.mutate({ eventId: eventId, status }, {
            onSuccess() {
                useReminders.refetch()
                toast({
                    variant: "success",
                    title: "Status Update",
                    description: "Reminder status is updated.",
                })
            }
        })
    }

    const handleDeleteReminder = (eventId: number | undefined) => {
        if (!eventId) return false
        deleteReminderMutation.mutate({ eventId: eventId }, {
            onSuccess() {
                useReminders.refetch()
                console.log("it deleted now!")
                setModal(false)
                toast({
                    variant: "success",
                    title: "Remove task",
                    description: "Task is deleted.",
                })
            }
        })
    }

    const handleEditReminder = () => {

        const startTime = convertLocalTimeToUTCSimple(remindersObj.start)
        const reminderTime = convertLocalTimeToUTCSimple(remindersObj.reminder)

        if (reminderTime < startTime) {
            reminderEditMutation.mutate({ eventId: remindersObj.eventId, desc: remindersObj.desc, timeStart: startTime, timeReminder: reminderTime }, {
                onSuccess() {
                    console.log("inside refetch")
                    useReminders.refetch()
                }
            })
        } else if (reminderTime > startTime || reminderTime === startTime) {
            console.error("Reminder is later than start time or the same.");
        }
    }

    const extractTime = (isoString: any) => {
        const date = new Date(isoString);
        const hours = date.getHours().toString().padStart(2, '0');
        const minutes = date.getMinutes().toString().padStart(2, '0');
        return `${hours}:${minutes}`;
    };

    // const reminders = useReminders.data && useReminders?.data
    if (useReminders.isLoading) return <Loading />

    return (
        <div className='w-full min-h-96 flex pb-16 items-center justify-center flex-col gap-12'>
            <div className='text-2xl font-medium w-full flex items-center justify-center'>Reminders</div>
            <div className='absolute top-0 p-8 left-8'>
                <Buttonanimate href="/dashboard/recorder" back={true} />
                <span className='text-xs'>Go to recorder</span>
            </div>
            <div className='place-items-center w-2/4 h-full grid grid-cols-2 gap-8 '>
                {reminders && reminders.map((opts, index) => {
                    const startDate = format(new Date(opts.start), "yyyy-MM-dd HH:mm");
                    const reminderDate = format(new Date(opts.reminder), "yyyy-MM-dd HH:mm");
                    return (
                        <motion.div initial="initial"
                            animate="animate" variants={iconVariants} key={index} className='w-full bg-white h-54 p-8 gap-2 flex flex-col shadow-lg rounded-xl relative'>
                            <div className='absolute right-2 justify-end flex'>
                                <div className='flex gap-2'>
                                    <Dialog open={modal} onOpenChange={setModal} >
                                        <DialogTrigger
                                            onClick={() => {
                                                setRemindersObj({
                                                    desc: opts.desc,
                                                    start: extractTime(opts.start),
                                                    reminder: extractTime(opts.reminder),
                                                    eventId: opts.eventId
                                                });
                                            }}
                                            asChild className='w-full relative'>
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
                                                <Button onClick={() => { setModal(false) }} className='border border-slate-100 shadow-2xl rounded-3xl h-8 bg-gray-500 text-white hover:bg-gray-800 transition-colors duration-500'>CANCEL</Button>
                                                <Button onClick={() => { handleEditReminder(), setModal(false) }} className='border border-slate-100 shadow-2xl rounded-3xl h-8 bg-gray-500 text-white hover:bg-gray-800 transition-colors duration-500'>SUBMIT</Button>
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

                            {!opts.status && <motion.div
                                initial="initial"
                                animate="animate"
                                variants={iconVariants} className='absolute right-2 bottom-8 justify-end flex cursor-pointer' onClick={() => {
                                    handleSetReminderStatus(opts.eventId, !opts.status)
                                }}><IoCheckmark size={20} /></motion.div>}
                            {opts.status && <motion.div
                                initial="initial"
                                animate="animate"
                                variants={iconVariants} className='absolute right-2 bottom-8 justify-end flex cursor-pointer' onClick={() => {
                                    handleSetReminderStatus(opts.eventId, !opts.status)
                                }}><IoCloseOutline size={20} /></motion.div>}
                        </motion.div>
                    )
                }
                )}
            </div>
        </div >
    )
}

export default Reminder