import { create } from 'zustand';

interface AIResponse {
  type: string;
  content: any;
  timestamp: number;
}

interface AIState {
  history: AIResponse[];
  isGenerating: boolean;
  addHistory: (response: AIResponse) => void;
  setGenerating: (status: boolean) => void;
}

export const useAIStore = create<AIState>((set) => ({
  history: [],
  isGenerating: false,
  addHistory: (response) => set((state) => ({ history: [response, ...state.history] })),
  setGenerating: (status) => set({ isGenerating: status }),
}));
