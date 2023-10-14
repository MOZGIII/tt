import {
  createJSONStorage,
  createSerdeStorage,
  Deserialize,
  Serialize,
} from "../lib/zustandPersistUtils";

export const standardGetStorage = () => localStorage;

export function createStorage<State, RawState = State>(
  serialize: Serialize<State, RawState>,
  deserialize: Deserialize<State, RawState>,
) {
  return createSerdeStorage(serialize, deserialize, () =>
    createJSONStorage<RawState>(standardGetStorage),
  );
}
