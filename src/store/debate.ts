import { StateCreator } from "zustand";

export interface DebateStateType {
  debateText: string;
  setDebateText: (value: string) => void;
}

export const useErrorState: StateCreator<DebateStateType> = (set) => ({
    debateText: "",
  setDebateText: (value) => set({ debateText: value }),
});
