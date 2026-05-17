import { create } from 'zustand';

interface UIState {
  isSidebarOpen: boolean;
  activeModal: string | null;
  toggleSidebar: () => void;
  setActiveModal: (modal: string | null) => void;
  isLoading: boolean;
  setLoading: (status: boolean) => void;
}

export const useUIStore = create<UIState>((set) => ({
  isSidebarOpen: false,
  activeModal: null,
  isLoading: false,
  toggleSidebar: () => set((state) => ({ isSidebarOpen: !state.isSidebarOpen })),
  setActiveModal: (modal) => set({ activeModal: modal }),
  setLoading: (status) => set({ isLoading: status }),
}));
