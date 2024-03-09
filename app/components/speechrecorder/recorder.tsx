import { api } from '@/lib/api';
import { aiRouter } from '@/server/routers/ai';
import { useEffect, useRef, useState } from 'react'

export const useRecorder = () => {
    const [mediaRecorder, setMediaRecorder] = useState<any>(false);
    const [recorder, setRecorder] = useState<any>(false)
    const [audio, setAudio] = useState<any>(false)
    const chunks = useRef([]);

    const generateText = api.ai.generateText.useMutation({
        onSettled() {
            console.log("its settled now")
        }
    })

    const handleGenerateText = (blob: any) => {
        console.log("check now blob ->", blob)

        const audioUrl = URL.createObjectURL(blob);

        setAudio(audioUrl)
        console.log("audioUrl check ->", audioUrl)
        // generateText.mutate({
        //     audio: blob
        // }, {
        //     onSuccess() {
        //         console.log("its succesfull now")
        //     }
        // })
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
            console.log("check recorder ->", recorder)
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

