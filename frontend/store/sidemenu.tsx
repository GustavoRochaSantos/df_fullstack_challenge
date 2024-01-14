import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";

interface SideMenuData {
  isOpen: boolean;
  toggle: () => void;
}

const useSideMenuStore = create<SideMenuData>()(
  devtools(
    persist(
      (set) => ({
        isOpen: true,
        toggle: () => set((state) => ({ isOpen: !state.isOpen })),
      }),
      { name: "sideMenuStore" }
    )
  )
);

export default useSideMenuStore;
