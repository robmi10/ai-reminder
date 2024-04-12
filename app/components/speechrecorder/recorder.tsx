import { useReminderStore } from '@/zustand/reminderstore';
import { useEffect, useRef, useState } from 'react'
import { createClient } from '@supabase/supabase-js'

export const useRecorder = () => {
    // console.log("Supabase URL:", process.env.SECRET_SUPABASE_URL);
    // console.log("Supabase Key:", process.env.SECRET_SUPABASE_KEY);

    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL ?? ''
    const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_KEY ?? ''

    const supabase = createClient(supabaseUrl, supabaseAnonKey)


    const [mediaRecorder, setMediaRecorder] = useState<any>(false);
    const [recorder, setRecorder] = useState<any>(false)
    const chunks = useRef([]);
    const { setAudio } = useReminderStore()

    const handleUploadAudio = async (audioBlob: any) => {
        try {
            const formData = new FormData();
            formData.append('audioBlob', audioBlob);

            const response = await fetch('/api/storage', {
                method: 'POST',
                body: formData,
            });

            const data = await response.json();

            if (response.ok) {
                console.log("data recorder check ->", data)
                return data.url;
            } else {
                throw new Error(data.error || "Failed to upload audio.");
            }
        } catch (error) {
            console.error('Error uploading audio:', error);
            return null;
        }

    }

    const handleGenerateText = async (blob: any) => {
        const audioUrl = await handleUploadAudio(blob) ?? ''
        console.log("audioUrl current ->", audioUrl)
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

