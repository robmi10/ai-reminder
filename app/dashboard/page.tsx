"use client"
import { Button } from '@/components/ui/button'
import { SignOutButton } from '@clerk/nextjs'
import React from 'react'
import Recorder from './recorder/page'
import { useRouter } from 'next/navigation'

const Dashboard = () => {
    const router = useRouter();
    const handleSignOut = () => {
        console.log("Signing out, navigate to start page");
        router.push('/'); // Redirect to the home page after sign out
    };

    return (
        <div className='bg-stone-100'>
            <div className="space-y-8 w-screen h-screen">
                <div className="flex justify-end p-4">
                    <SignOutButton signOutCallback={handleSignOut}>
                        <Button onClick={() => { console.log("navigate to start page") }} className="w-auto shadow-lg rounded-full bg-gray-500 text-white hover:bg-gray-800 transition-colors duration-500"> Sign Out</Button>
                    </SignOutButton>
                </div>
                <Recorder />
            </div>
        </div>
    )
}

export default Dashboard