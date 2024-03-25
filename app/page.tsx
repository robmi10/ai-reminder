
"use client"
import VoiceRecognition from "@/app/components/speechrecorder";
import { Button } from "@/components/ui/button";
import { SignInButton, SignOutButton, useUser } from "@clerk/nextjs";
import Reminders from "./components/reminders";
import Firstpage from "./home/firstpage";
import Secondpage from "./home/secondpage";
import Thirdpage from "./home/thirdpage";
import Footer from "./components/footer/footer";
import Buttonanimate from "./components/animation/buttonanimate";
import Recorder from "./recorder/recorder";

export default function Home() {
  const { isSignedIn } = useUser();

  return (
    <div className="h-screen space-y-8 w-screen bg-stone-50">
      {!isSignedIn &&
        <div>
          <div className="flex justify-end p-4">
            <SignInButton>
              <Button className="w-auto shadow-lg rounded-full bg-gray-500 text-white hover:bg-gray-800 transition-colors duration-500"> Sign In</Button>
              {/* <Buttonanimate title={"Sign in"} /> */}
            </SignInButton>
          </div>
          <Firstpage />
          <Secondpage />
          <Thirdpage />
          <Footer />
        </div>
      }
      {isSignedIn && <div className="space-y-8 w-screen h-screen">
        <div className="flex justify-end p-4">
          <SignOutButton>
            <Button className="w-auto shadow-lg rounded-full bg-gray-500 text-white hover:bg-gray-800 transition-colors duration-500"> Sign Out</Button>
          </SignOutButton>
        </div>
        <Recorder />
        {/* <SignOutButton>
          <Button className="rounded-xl border border-black w-1/4 hover:bg-slate-100 hover:transition-colors hover:duration-300 hover:ease-in-out"> LOGOUT</Button>
        </SignOutButton>
        <VoiceRecognition />
        <Reminders /> */}
      </div>}

    </div >
  );
}
