import React from 'react'
import { CiMicrophoneOn } from "react-icons/ci";
import { GoDotFill } from "react-icons/go";
import { useRecorder } from './recorder';


const VoiceRecognition = () => {
  const { recorder, stopRecorder, startRecorder } = useRecorder()


  console.log("recorder ->", recorder)

  return (
    <div className='w-full h-[300px] border border-black rounded-2xl flex p-8 flex-col items-center space-y-8'>
      <span >VOICE RECORDER</span>
      <div className='h-full flex justify-center items-center'>
        {!recorder && <CiMicrophoneOn size={30} color='blue' className='cursor-pointer' onClick={() => {
          startRecorder()
        }} />}

        {recorder && <GoDotFill size={30} color='red' className='cursor-pointer animate-ping' onClick={() => {
          stopRecorder()
        }} />}
      </div>
    </div>
  )
}

export default VoiceRecognition