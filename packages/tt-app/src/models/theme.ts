import { create } from "zustand";
import { persist, PersistOptions } from "zustand/middleware";

import { ThemeId } from "../theme";
import { createStorage } from ".";

type ThemeState = {
  themeId: ThemeId;
};

const defaultValue: ThemeState = {
  themeId: "dark",
};

export const themeActions = {
  switch: (themeId: ThemeId): void => {
    useThemeStore.setState((state) => ({ ...state, themeId }));
  },
};

const persistOptions: PersistOptions<ThemeState> = {
  name: "theme",
};

export const useThemeStore = create<ThemeState>()(
  persist(() => defaultValue, persistOptions)
);
