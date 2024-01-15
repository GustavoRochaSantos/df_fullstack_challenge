"use client";
import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";

interface ModalObjects {
  [key: string]: any;
}

interface ModalData {
  pages: ModalObjects;
  toggle: (page: string) => void;
}

const useModalStore = create<ModalData>()(
  devtools((set, get) => ({
    pages: [],
    toggle: (page: string) =>
      set((state) => {
        const pages = state.pages;
        pages[page] = !pages[page];

        return { ...state, pages };
      }),
  }))
);

export default useModalStore;
