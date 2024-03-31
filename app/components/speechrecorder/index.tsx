import React, { useEffect, useState } from 'react'
import { CiMicrophoneOn } from "react-icons/ci";
import { GoDotFill } from "react-icons/go";
import { useRecorder } from './recorder';
import { useReminderStore } from '@/zustand/reminderstore';
import { api } from '@/lib/api';
import { motion } from "framer-motion"
import Globe from '../animation/globe';

const VoiceRecognition = () => {
  const { recorder, stopRecorder, startRecorder } = useRecorder()
  const { audio, setTranscription, setReminder } = useReminderStore()
  const [isHover, setIsHover] = useState(false)
  console.log("recorder ->", recorder)
  const generateTextMutation = api.ai.generateText.useMutation({
    onSettled() {
      console.log("its settled now")
    }
  })

  const variantAudio = {
    hover: { scale: 1.2, opacity: 1, transition: { type: "springer", duration: 0.2, ease: "easeInOut" } },
    initial: { scale: 1, opacity: 1 },
  }

  useEffect(() => {
    audio && generateTextMutation.mutate({
      audio: audio
    }, {
      onSuccess(data: any) {
        console.log("its succesfull now")
        setReminder(data.reminder)
        setTranscription(data.text)
      }
    })
  }, [audio])

  console.log("generateTextMutation status ->", generateTextMutation.status)


  return (
    <div className='w-full h-auto rounded-2xl flex p-8 flex-col items-center space-y-18'>
      <Globe recorder={recorder} />
      <div className='h-2/4 w-full flex justify-center items-center'>
        {!generateTextMutation.isPending && <div className='flex flex-col justify-center items-center gap-8'>
          <div

            onMouseEnter={() => setIsHover(true)}
            onMouseLeave={() => setIsHover(false)}
            className='flex items-center gap-2 border rounded-full p-4 cursor-pointer bg-gray-100 hover:bg-gray-200 transition-colors duration-150 ease-in-out'>
            {!recorder && <motion.div

              variants={variantAudio}
              initial="initial"
              animate={isHover ? "hover" : "initial"}
              exit="initial"> <CiMicrophoneOn size={20} color='indigo' onClick={() => {
                startRecorder()
              }} />

            </motion.div>}
            {recorder && <GoDotFill size={20} color='red' className='animate-ping' onClick={() => {
              stopRecorder()
            }} />}
            {audio && <audio src={audio} controls></audio>}
          </div>
          <div className='flex w-full flex-row gap-8 justify-between text-sm'>
            {/* <div>
              <span>TRANSCRIPTION</span>
              {transcription && <WordByWordRenderer delay={150} text={transcription} />}
            </div>
            <div>
              <span>REMINDERS</span>
              {reminder && <WordByWordRenderer delay={150} text={reminder} />}
            </div> */}
          </div>
        </div>}
        {generateTextMutation.isPending && <div>
          <svg aria-hidden="true" className="w-8 h-8 text-gray-200 animate-spin dark:text-gray-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
            <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
          </svg>
        </div>}
      </div>
    </div>
  )
}

export default VoiceRecognition