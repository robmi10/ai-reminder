
"use client"
import VoiceRecognition from "@/app/components/speechrecorder";
import { Button } from "@/components/ui/button";
import { SignInButton, SignOutButton, useUser } from "@clerk/nextjs";
import Reminders from "./components/reminders";
import Firstpage from "./home/firstpage";
import Secondpage from "./home/secondpage";

export default function Home() {
  const { isSignedIn } = useUser();

  return (
    <div className="h-screen space-y-8 w-screen bg-stone-50">
      {!isSignedIn &&
        <div>
          <div className="flex justify-end p-4">
            <SignInButton>
              <Button className="w-16 shadow-lg"> Sign In</Button>
            </SignInButton>
          </div>
          <Firstpage />
          <Secondpage />
          <Firstpage />
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
  );
}
