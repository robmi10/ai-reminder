
"use client"
import VoiceRecognition from "@/app/components/speechrecorder";
import { Button } from "@/components/ui/button";
import { SignInButton, SignOutButton, useUser } from "@clerk/nextjs";
import Reminders from "./components/reminders";

export default function Home() {
  const { isSignedIn } = useUser();

  return (
    <div className="text-5xl flex justify-center items-center h-full p-8 font-bold">
      <div className="space-y-8">
        {!isSignedIn &&
          <div className="h-screen flex items-center flex-col gap-8 justify-center" >
            <h1> WELCOME TO AI REMINDER</h1>
            <SignInButton>
              <Button className="rounded-xl border border-black w-1/4 hover:bg-slate-100 hover:transition-colors hover:duration-300 hover:ease-in-out"> LOGIN</Button>
            </SignInButton>
          </div>

        }
        {isSignedIn && <div className="space-y-8 w-full flex flex-col items-center">
          <div>YOU ARE LOGGED IN NOW </div>
          <SignOutButton>
            <Button className="rounded-xl border border-black w-1/4 hover:bg-slate-100 hover:transition-colors hover:duration-300 hover:ease-in-out"> LOGOUT</Button>
          </SignOutButton>
          <VoiceRecognition />
          <Reminders />
        </div>}
      </div>
    </div>
  );
}
