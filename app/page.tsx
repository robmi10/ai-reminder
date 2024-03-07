
"use client"
import VoiceRecognition from "@/components/speechrecorder";
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
              <Button className="rounded-md border border-black w-1/4 hover:bg-slate-100 hover:transition-colors hover:duration-300 hover:ease-in-out"> LOGIN</Button>
            </SignInButton>
          </>
        }
        {isSignedIn && <div className=" space-y-8">
          <div>YOU ARE LOGGED IN NOW </div>
          <SignOutButton>
            <Button className="rounded-md border border-black w-1/4 hover:bg-slate-100 hover:transition-colors hover:duration-300 hover:ease-in-out"> LOGOUT</Button>
          </SignOutButton>

          <VoiceRecognition />
        </div>}
      </div>
    </div>
  );
}