import React from 'react'
import { RxPencil1 } from "react-icons/rx";
import { CiTrash } from "react-icons/ci";
import { IoCheckmark } from "react-icons/io5";
import Buttonanimate from '../components/animation/buttonanimate';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

const Reminder = () => {
    return (
        <div className='h-full w-full flex items-center justify-center flex-col gap-12'>
            <div className='text-2xl font-medium w-full flex items-center justify-center'>Reminders</div>
            <div className='absolute top-0 p-8 left-8'>
                <Buttonanimate back={true} />
            </div>
            <div className='place-items-center w-2/4 h-full grid grid-cols-2 gap-8 '>
                <div className='w-full bg-white h-54 p-8 gap-2 flex flex-col shadow-lg rounded-xl relative'>
                    <div className='absolute right-2 justify-end flex'>
                        <div className='flex gap-2'>
                            <>
                                <Dialog>
                                    <DialogTrigger asChild className='w-full relative'>
                                        <RxPencil1 className='cursor-pointer absolute w-full right-0 top-0' />
                                    </DialogTrigger>
                                    <DialogContent className='bg-white rounded-xl p-8 shadow-2xl'>
                                        <span className='text-xl'>Edit Reminder.</span>

                                        <div>
                                            <span className='text-sm'>Description</span>
                                            <Input type='text' placeholder="Desc" className='rounded-3xl border-stone-200 shadow-3xl text-stone-400' />
                                        </div>

                                        <div>
                                            <span className=' text-sm'>Task date</span>
                                            <Input type='date' placeholder="Task date" className='rounded-3xl border-stone-200 shadow-3xl text-stone-400' />
                                        </div>

                                        <div>
                                            <span className=' text-sm'>Reminder</span>
                                            <Input type='time' placeholder="Reminder" className='rounded-3xl border-stone-200 shadow-3xl text-stone-400' />
                                        </div>
                                    </DialogContent>
                                </Dialog>

                                <Dialog>
                                    <DialogTrigger asChild className='w-full relative'>
                                        <CiTrash className='cursor-pointer absolute w-full right-0 bg-red-50 top-0' />
                                    </DialogTrigger>
                                    <DialogContent className='bg-white rounded-xl p-8 shadow-2xl'>
                                        <span className='text-xl'>Delete Reminder?</span>
                                        <DialogDescription>
                                            This action cannot be undone. This will permanently delete your reminder.
                                        </DialogDescription>
                                        <div className='flex gap-4'>
                                            <Button className='border border-slate-100 shadow-2xl rounded-3xl h-8 bg-gray-500 text-white hover:bg-gray-800 transition-colors duration-500'>YES</Button>
                                            <Button className='border border-slate-100 shadow-2xl rounded-3xl h-8 bg-gray-500 text-white hover:bg-gray-800 transition-colors duration-500'>NO</Button>
                                        </div>
                                    </DialogContent>
                                </Dialog>
                            </>
                        </div></div>
                    <div className='flex flex-col'>
                        <span className='font-medium'>Desc</span>
                        <span>Grocery Shopping</span>
                    </div>
                    <div className='flex flex-col'>
                        <span className='font-medium'>Start</span>
                        <span>2024-03-10T12:00:00.000Z</span>
                    </div>
                    <div className='flex flex-col'>
                        <span className='font-medium'>Reminder</span>
                        <span>2024-03-10T11:30:00.000Z</span>
                    </div>
                    <div className='absolute right-2 bottom-8 justify-end flex'><IoCheckmark size={20} className='cursor-pointer' /></div>
                </div>

                <div className='w-full bg-white h-54 p-8 gap-2 flex flex-col shadow-lg rounded-xl relative'>
                    <div className='absolute right-2 justify-end flex'><div className='flex gap-2'> <RxPencil1 className='cursor-pointer' /> <CiTrash className='cursor-pointer' /></div></div>
                    <div className='flex flex-col'>
                        <span className='font-medium'>Desc:</span>
                        <span>Grocery Shopping</span>
                    </div>
                    <div className='flex flex-col'>
                        <span className='font-medium'>Start:</span>
                        <span>2024-03-10T12:00:00.000Z</span>
                    </div>
                    <div className='flex flex-col'>
                        <span className='font-medium'>Reminder:</span>
                        <span>2024-03-10T11:30:00.000Z</span>
                    </div>
                    <div className='absolute right-2 bottom-8 justify-end flex'><IoCheckmark size={20} className='cursor-pointer' /></div>
                </div>

                <div className='w-full bg-white h-54 p-8 gap-2 flex flex-col shadow-lg rounded-xl relative'>
                    <div className='absolute right-2 justify-end flex'><div className='flex gap-2'> <RxPencil1 className='cursor-pointer' /> <CiTrash className='cursor-pointer' /></div></div>
                    <div className='flex flex-col'>
                        <span className='font-medium'>Desc</span>
                        <span>Grocery Shopping</span>
                    </div>
                    <div className='flex flex-col'>
                        <span className='font-medium'>Start</span>
                        <span>2024-03-10T12:00:00.000Z</span>
                    </div>
                    <div className='flex flex-col'>
                        <span className='font-medium'>Reminder</span>
                        <span>2024-03-10T11:30:00.000Z</span>
                    </div>
                    <div className='absolute right-2 bottom-8 justify-end flex'><IoCheckmark size={20} className='cursor-pointer' /></div>
                </div>

                <div className='w-full bg-white h-54 p-8 gap-2 flex flex-col shadow-lg rounded-xl relative'>
                    <div className='absolute right-2 justify-end flex'><div className='flex gap-2'> <RxPencil1 className='cursor-pointer' /> <CiTrash className='cursor-pointer' /></div></div>
                    <div className='flex flex-col'>
                        <span className='font-medium'>Desc:</span>
                        <span>Grocery Shopping</span>
                    </div>
                    <div className='flex flex-col'>
                        <span className='font-medium'>Start:</span>
                        <span>2024-03-10T12:00:00.000Z</span>
                    </div>
                    <div className='flex flex-col'>
                        <span className='font-medium'>Reminder:</span>
                        <span>2024-03-10T11:30:00.000Z</span>
                    </div>
                    <div className='absolute right-2 bottom-8 justify-end flex'><IoCheckmark size={20} className='cursor-pointer' /></div>
                </div>

            </div>

        </div >
    )
}

export default Reminder