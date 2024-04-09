"use client"
import { Button } from '@/components/ui/button'
import { SignOutButton } from '@clerk/nextjs'
import React, { ReactNode } from 'react'
import { useRouter } from 'next/navigation'
import Footer from '../components/footer/footer'
import { Toaster } from '@/components/ui/toaster'

interface DashboardProps {
    children?: ReactNode;
}
const Dashboard = ({ children }: DashboardProps) => {
    const router = useRouter();
    const handleSignOut = () => {
        console.log("Signing out, navigate to start page");
        router.push('/');
    };

    return (<>
        <div className='bg-stone-50 min-h-screen'>
            <div className="flex justify-end p-4">
                <SignOutButton signOutCallback={handleSignOut}>
                    <Button onClick={() => { console.log("navigate to start page") }} className="w-auto shadow-lg rounded-full bg-gray-500 text-white hover:bg-gray-800 transition-colors duration-500"> Sign Out</Button>
                </SignOutButton>
            </div>
            {children}
            <Toaster />
        </div>
        <Footer />
    </>
    )
}

export default Dashboard