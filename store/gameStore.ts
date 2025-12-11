import { create } from 'zustand';

interface GameState {
    score: number;
    addScore: (amount: number) => void;
    resetScore: () => void;
}

export const useGameStore = create<GameState>((set) => ({
    score: 0,
    addScore: (amount) => set((state) => ({ score: state.score + amount })),
    resetScore: () => set({ score: 0 }),
}));
