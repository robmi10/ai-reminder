import React, { useEffect, useState } from 'react'
import { CiMicrophoneOn, CiMicrophoneOff } from "react-icons/ci";
import { GoDotFill } from "react-icons/go";
import { useRecorder } from './recorder';
import { useReminderStore } from '@/zustand/reminderstore';
import { api } from '@/lib/api';
import { motion } from "framer-motion"
import Globe from '../animation/globe';
import Loading from '../loader/loading';
import { useUser } from '@clerk/nextjs';
import { twMerge } from 'tailwind-merge';
import { useToast } from '@/components/ui/use-toast';

const VoiceRecognition = () => {
  const { recorder, stopRecorder, startRecorder } = useRecorder()
  const { audio, setTranscription, setReminder, setAudio, generateText, setGenerateText } = useReminderStore()
  const [isHover, setIsHover] = useState(false)
  const { user } = useUser();
  const { toast } = useToast()
  const generateTextMutation = api.ai.generateText.useMutation({})
  const isRemindersUsageFull = api.ai.isRemindersUsageAcceptable.useQuery({ user: user }).data

  const variantAudio = {
    hover: { scale: 1.2, opacity: 1, transition: { type: "springer", duration: 0.2, ease: "easeInOut" } },
    initial: { scale: 1, opacity: 1 },
  }

  const [micPermission, setMicPermission] = useState('prompt'); // 'granted', 'denied', 'prompt'

  useEffect(() => {
    const checkMicrophonePermission = async () => {
      try {
        const permissionStatus = await navigator.permissions.query({ name: 'microphone' as PermissionName });
        permissionStatus.onchange = () => {
          setMicPermission(permissionStatus.state);
        };
        setMicPermission(permissionStatus.state);
      } catch (error) {
        console.error('Error checking microphone permission:', error);
        toast({
          variant: "destructive",
          title: "Permission Error",
          description: "Could not check microphone permission. Make sure your browser supports this feature."
        });
      }
    };

    checkMicrophonePermission();
  }, []);

  const variantToolTip = {
    animate: { opacity: 1, transition: { type: "springer", duration: 0.3, ease: "easeInOut" } },
    initial: { scale: 1, opacity: 0 }
  }

  useEffect(() => {
    audio && generateTextMutation.mutate({
      audio: audio, user: user, timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone
    }, {
      onSuccess(data: any) {
        setReminder(data.reminder)
        setTranscription(data.text)
        setAudio(false)
        setGenerateText(false)
      }, onError() {
        setAudio(false)
        setGenerateText(false)
        toast({
          variant: "destructive",
          title: "Failed to Generate Reminders",
          description: "Failed to generate the reminders. Please try again or contact support if the problem persists.",
        })
      },
    })
  }, [audio])

  if (generateTextMutation.isPending || generateText) return <Loading />

  return (
    <div className='w-full md:h-auto rounded-2xl flex p-8 flex-col items-center md:space-y-18'>
      <Globe recorder={recorder} />
      <div className='h-2/4 w-full flex justify-center relative items-center'>

        {isRemindersUsageFull && isHover && micPermission === 'granted' && <motion.div variants={variantToolTip} animate="animate" initial="initial" className='absolute bottom-24 rounded-2xl  p-2 text-sm w-18'>
          Thank you for using Ai Reminder! You&apos;ve created two reminders today, which is your daily limit.
        </motion.div>}

        {isHover && micPermission === 'denied' && <motion.div variants={variantToolTip} animate="animate" initial="initial" className='absolute bottom-24 rounded-2xl  p-2 text-sm w-18'>
          Microphone access is denied. Please enable microphone permissions in your browser settings to use voice recognition features.
        </motion.div>}


        {!generateTextMutation.isPending && <div className='flex flex-col justify-center items-center gap-8'>
          <div
            onMouseEnter={() => setIsHover(true)}
            onMouseLeave={() => setIsHover(false)}
            onClick={() => {
              if (isRemindersUsageFull || micPermission === 'denied') return;
              !recorder ? startRecorder() : stopRecorder()
            }}
            className={twMerge('flex items-center gap-2 border rounded-full p-4 bg-gray-100',
              !isRemindersUsageFull && 'hover:bg-gray-200 transition-colors duration-150 ease-in-out cursor-pointer',
              isRemindersUsageFull && 'opacity-75 cursor-no-drop'
            )}>
            {!recorder && <motion.div
              variants={variantAudio}
              initial="initial"
              animate={isHover && !isRemindersUsageFull ? "hover" : "initial"}
              exit="initial"> {(!isRemindersUsageFull && micPermission === 'granted') ? <CiMicrophoneOn size={20} color='indigo' /> : <CiMicrophoneOff size={20} color='indigo' />}

            </motion.div>}

            {recorder && <GoDotFill size={20} color='red' className='animate-ping' />}
          </div>
          <div className='flex w-full flex-row gap-8 justify-between text-sm'>
          </div>
        </div>}
      </div>
    </div>
  )
}

export default VoiceRecognition