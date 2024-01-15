"use client";
import { StateCreator, create } from "zustand";
import {
  PersistOptions,
  createJSONStorage,
  devtools,
  persist,
} from "zustand/middleware";

interface UserData {
  id?: string;
  name?: string | undefined;
  fullName?: string | undefined;
  photo?: string | undefined;
}

interface Data {
  loginModalIsOpen: boolean;
  actions: {
    setLogin: (data: UserData) => void;
    loginModalToggle: () => void;
  };
}

type State = {
  id: string | undefined;
  name: string;
  fullName: string;
  photo: string | undefined;
  loginModalIsOpen: boolean;
};

type Actions = {
  setLogin: (data: UserData) => void;
  loginModalToggle: () => void;
};

const useUserStore = create<State & Actions>()(
  persist(
    (set) => ({
      id: undefined,
      name: "",
      fullName: "",
      photo: undefined,
      loginModalIsOpen: false,
      setLogin: (data: UserData) => {
        set(data);
      },
      loginModalToggle: () =>
        set((state) => ({
          ...state,
          loginModalIsOpen: !state.loginModalIsOpen,
        })),
    }),
    {
      name: "user-store",
      storage: createJSONStorage(() => sessionStorage),
      skipHydration: true,
    }
  )
);

export default useUserStore;
