import { create } from 'zustand'

type ReminderStoreState = {
    audio: any;
    setAudio: (newAudioState: string) => void;
};

export const useReminderStore = create<ReminderStoreState>((set) => ({
    audio: false,
    setAudio: (audioState) => set({ audio: audioState })
}))