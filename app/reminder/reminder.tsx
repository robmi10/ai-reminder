import React from 'react'
import { RxPencil1 } from "react-icons/rx";
import { CiTrash } from "react-icons/ci";
import { IoCheckmark } from "react-icons/io5";
import Buttonanimate from '../components/animation/buttonanimate';

const Reminder = () => {
    return (
        <div className='h-full w-full flex items-center flex-col space-y-12 relative'>
            <div className='absolute top-0 p-8 left-8'>
                <Buttonanimate back={true} />
            </div>
            <div className='text-2xl font-medium w-2/6'>Reminders</div>
            <div className='w-2/6 bg-white h-54 p-8 gap-2 flex flex-col shadow-lg rounded-xl relative'>
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

            <div className='w-2/6 bg-white h-54 p-8 gap-2 flex flex-col shadow-lg rounded-xl relative'>
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
    )
}

export default Reminder