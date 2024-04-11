import { useReminderStore } from '@/zustand/reminderstore';
import { useEffect, useRef, useState } from 'react'
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL ?? ''
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_KEY ?? ''

if (!supabaseUrl || !supabaseAnonKey) {
    throw new Error("Supabase URL and Anon Key must be provided.");
}
const supabase = createClient(supabaseUrl, supabaseAnonKey)

export const useRecorder = () => {
    const [mediaRecorder, setMediaRecorder] = useState<any>(false);
    const [recorder, setRecorder] = useState<any>(false)
    const chunks = useRef([]);
    const { setAudio } = useReminderStore()

    const handleUploadAudio = async (audioBlob: any) => {
        const filePath = `uploads/${Date.now()}-audiofile.wav`;
        const { data, error } = await supabase.storage.from('reminders').upload(filePath, audioBlob, {
            cacheControl: '3600',
            upsert: false,

        })

        if (error) {
            console.error(error)
            return null
        }

        const res = supabase.storage.from('reminders').getPublicUrl(filePath);
        const fileUrl = res.data.publicUrl
        return fileUrl;
    }

    const handleGenerateText = async (blob: any) => {
        const audioUrl = await handleUploadAudio(blob) ?? ''
        setAudio(audioUrl)
    }

    const startRecorder = () => {
        if (mediaRecorder) {
            mediaRecorder.start()
            setRecorder(true);
        }
    }

    const stopRecorder = () => {
        if (mediaRecorder) {
            mediaRecorder.stop()
            setRecorder(false);
        }
    }

    const initRecorder = (stream: any) => {
        const voiceRecorder = new MediaRecorder(stream)
        voiceRecorder.onstart = () => {
            chunks.current = [];
        }

        voiceRecorder.ondataavailable = (event) => {
            chunks.current.push(event?.data as never)
        }

        voiceRecorder.onstop = () => {
            const audioBlob = new Blob(chunks.current, { type: "audio/wav" });
            console.log("audioBlob ->", audioBlob)
            handleGenerateText(audioBlob);
        }
        setMediaRecorder(voiceRecorder);
    }


    useEffect(() => {
        if (typeof window !== "undefined") {
            navigator.mediaDevices
                .getUserMedia({ audio: true })
                .then(initRecorder);
        }
    }, []);

    return { recorder, stopRecorder, startRecorder }
}

