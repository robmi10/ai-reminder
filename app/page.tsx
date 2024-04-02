
"use client"
import { useUser } from "@clerk/nextjs";
import HomePage from "./home";
import { useEffect } from "react";
// import Dashboard from "./dashboard";
import { useRouter } from 'next/navigation'
import Dashboard from "./dashboard/layout";
import { BouncerLoader } from "./components/animation/bouncer";
import Loading from "./components/loader/loading";
import { ClerkLoaded, ClerkLoading } from "@clerk/nextjs";

export default function Home() {
  const { isSignedIn, isLoaded } = useUser();
  const router = useRouter()

  useEffect(() => {
    console.log("isSignedIn check ->", isSignedIn)
    if (isSignedIn) {
      router.push('/dashboard/reminder');
    } else if (!isSignedIn) {
      router.push('/');
    }
  }, [isSignedIn, router, isLoaded]);

  return (
    <div className="h-full space-y-8 w-screen bg-stone-50">
      {!isSignedIn && <ClerkLoaded>
        <HomePage />
      </ClerkLoaded>}
      <ClerkLoading>
        <Loading />
      </ClerkLoading>
    </div >
  );
}
