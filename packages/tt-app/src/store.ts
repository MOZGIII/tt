import { init, RematchDispatch, RematchRootState } from "@rematch/core";
import persistPlugin from "@rematch/persist";
import storage from "redux-persist/es/storage";
import { PersistConfig } from "redux-persist/es/types";

import { models, RootModel, transforms } from "./models";
import rootTransform from "./storeTransforms";

const persistConfig: PersistConfig<RootModel> = {
  key: "root",
  storage,
  transforms: [rootTransform(transforms)],
};

export const store = init<RootModel>({
  models,
  plugins: [persistPlugin(persistConfig)],
});

export type Store = typeof store;
export type Dispatch = RematchDispatch<RootModel>;
export type RootState = RematchRootState<RootModel>;
