
"use client"
import { useUser } from "@clerk/nextjs";
import HomePage from "./home";
import { useEffect } from "react";
// import Dashboard from "./dashboard";
import { useRouter } from 'next/navigation'
import Dashboard from "./dashboard/page";

export default function Home() {
  const { isSignedIn } = useUser();
  const router = useRouter()

  useEffect(() => {
    console.log("isSignedIn check ->", isSignedIn)
    if (isSignedIn) {
      router.push('/dashboard');
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
