
"use client"
import { Button } from "@/components/ui/button";
import { SignInButton, SignOutButton, useUser } from "@clerk/nextjs";
import Firstpage from "./firstpage";
import Secondpage from "./secondpage";
import Thirdpage from "./thirdpage";
import Footer from "../components/footer/footer";

const HomePage = () => {
    console.log("inside HomePage")
    return (
        <>
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
            </div>
            <Footer />
        </>

    )
}

export default HomePage