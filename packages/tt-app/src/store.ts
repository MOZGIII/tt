import { init, RematchDispatch, RematchRootState } from "@rematch/core";
import persistPlugin from "@rematch/persist";
import storage from "redux-persist/es/storage";
import { PersistConfig } from "redux-persist/es/types";

import createModelsTransform, {
  SerializedState,
  State,
} from "./lib/modelsTransform";
import { models, RootModel, RootTransforms, transforms } from "./models";

const persistConfig: PersistConfig<
  State<RootModel>,
  SerializedState<RootModel, RootTransforms>
> = {
  key: "root",
  storage,
  transforms: [createModelsTransform<RootTransforms, RootModel>(transforms)],
};

export const store = init<RootModel>({
  models,
  plugins: [persistPlugin(persistConfig)],
});

export type Store = typeof store;
export type Dispatch = RematchDispatch<RootModel>;
export type RootState = RematchRootState<RootModel>;
