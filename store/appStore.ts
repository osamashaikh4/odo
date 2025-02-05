import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

export interface AppState {
  user?: any;
  update: (attrs: Partial<AppState>) => void;
}

export const useAppStore = create<AppState>()(
  persist(
    (set, get) => ({
      update: (attrs: Partial<AppState>) =>
        set((state) => {
          return { ...state, ...attrs };
        }),
    }),
    {
      name: "odo-store",
      storage: createJSONStorage(() => localStorage),
    }
  )
);
