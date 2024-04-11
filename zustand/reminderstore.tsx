import { create } from 'zustand'

type ReminderStoreState = {
    audio: any;
    setAudio: (newAudioState: string | boolean) => void;
    transcription: any;
    setTranscription: (newTranscriptionState: string) => void;
    reminder: any;
    setReminder: (newReminderState: string | boolean) => void;
};

export const useReminderStore = create<ReminderStoreState>((set) => ({
    audio: false,
    setAudio: (audioState) => set({ audio: audioState }),
    transcription: false,
    setTranscription: (transcriptionState) => set({ transcription: transcriptionState }),
    reminder: false,
    setReminder: (reminderState) => set({ reminder: reminderState }),
}))