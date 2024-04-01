
"use client"
import { useUser } from "@clerk/nextjs";
import HomePage from "./home";
import { useEffect } from "react";
// import Dashboard from "./dashboard";
import { useRouter } from 'next/navigation'
import Dashboard from "./dashboard/layout";

export default function Home() {
  const { isSignedIn, isLoaded } = useUser();
  const router = useRouter()

  useEffect(() => {
    console.log("isSignedIn check ->", isSignedIn)
    console.log("isLoading check ->", !isLoaded)
    if (isSignedIn) {
      router.push('/dashboard/recorder');
    } else if (!isSignedIn) {
      router.push('/');
    }
  }, [isSignedIn, router]);

  return (
    <div className="h-full space-y-8 w-screen bg-stone-50">
      <HomePage />
    </div >
  );
}
