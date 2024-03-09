
"use client"
import VoiceRecognition from "@/app/components/speechrecorder";
import { Button } from "@/components/ui/button";
import { SignInButton, SignOutButton, useUser } from "@clerk/nextjs";

export default function Home() {
  const { isSignedIn } = useUser();

  return (
    <div className="text-5xl flex justify-center items-center h-screen font-bold">
      <div className="space-y-8">
        {!isSignedIn &&
          <>
            <h1> WELCOME TO AI REMINDER</h1>
            <SignInButton>
              <Button className="rounded-xl border border-black w-1/4 hover:bg-slate-100 hover:transition-colors hover:duration-300 hover:ease-in-out"> LOGIN</Button>
            </SignInButton>
          </>
        }
        {isSignedIn && <div className="space-y-8 w-full flex flex-col items-center">
          <div>YOU ARE LOGGED IN NOW </div>
          <SignOutButton>
            <Button className="rounded-xl border border-black w-1/4 hover:bg-slate-100 hover:transition-colors hover:duration-300 hover:ease-in-out"> LOGOUT</Button>
          </SignOutButton>


          <VoiceRecognition />
        </div>}
      </div>
    </div>
  );
}
