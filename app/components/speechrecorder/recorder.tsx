import { useReminderStore } from '@/zustand/reminderstore';
import { useEffect, useRef, useState } from 'react'
import { createClient } from '@supabase/supabase-js'

export const useRecorder = () => {

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
        setRecorder(true);
        if (mediaRecorder) {
            mediaRecorder.start()
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

