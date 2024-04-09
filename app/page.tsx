
"use client"
import { useUser } from "@clerk/nextjs";
import HomePage from "./home";
import { useEffect } from "react";
import { useRouter } from 'next/navigation'
import Loading from "./components/loader/loading";
import { ClerkLoaded, ClerkLoading } from "@clerk/nextjs";

export default function Home() {
  const { isSignedIn, isLoaded } = useUser();
  const router = useRouter()

  useEffect(() => {
    if (isSignedIn) {
      router.push('/dashboard/recorder');
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
