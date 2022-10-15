import { createModel } from "@rematch/core";
import { ThemeId } from "tt-theme";

import { RootModel } from "./index";

export const theme = createModel<RootModel>()({
  state: "dark" as ThemeId,
  reducers: {
    switch(_state, themeId: ThemeId) {
      return themeId;
    },
  },
});
