import React from 'react'
import { twMerge } from 'tailwind-merge'

interface props {
    recorder?: any,
    large?: boolean
}

const Globe = ({ recorder, large }: props) => {
    return (
        <div className={twMerge('relative h-96 w-72',
        )}>
            <div className={twMerge('absolute z-10 bg-red-200 h-72 w-72 rounded-full opacity-100 blur-md',
                recorder && 'animate-pulse',
                large && 'h-[470px] w-[480px] animate-pulse'
            )} />
            <div className={twMerge('absolute z-10 bg-blue-200 h-64 w-64 rounded-full opacity-100 blur-lg',
                recorder && 'animate-spin',
                large && 'h-[420px] w-[420px] animate-pulse')} />
            <div className={twMerge('absolute z-30 top-10 left-10 bg-indigo-400 h-56 w-56 rounded-full opacity-50 blur-lg',
                recorder && 'animate-pulse',
                large && 'h-[400px] w-[400px] animate-pulse')} />
        </div>
    )
}

export default Globe