import { PersistStorage, StateStorage } from "zustand/middleware";

export type Serialize<State, RawState> = (state: State) => RawState;
export type Deserialize<State, RawState> = (rawState: RawState) => State;

export function createSerdeStorage<State, RawState>(
  serialize: Serialize<State, RawState>,
  deserialize: Deserialize<State, RawState>,
  getStorage: () => PersistStorage<RawState>
): PersistStorage<State> {
  const storage = getStorage();
  return {
    getItem: async (name) => {
      const data = await storage.getItem(name);
      if (data === null) return null;
      return {
        ...data,
        state: deserialize(data.state),
      };
    },
    setItem: (name, value) =>
      storage.setItem(name, { ...value, state: serialize(value.state) }),
    removeItem: storage.removeItem,
  };
}

export type StorageValue<S> = {
  state: S;
  version?: number;
};

export function createJSONStorage<S>(
  getStorage: () => StateStorage
): PersistStorage<S> {
  const storage = getStorage();
  const persistStorage: PersistStorage<S> = {
    getItem: (name) => {
      const parse = (str: string | null) => {
        if (str === null) {
          return null;
        }
        return JSON.parse(str) as StorageValue<S>;
      };
      const str = storage.getItem(name) ?? null;
      if (str instanceof Promise) {
        return str.then(parse);
      }
      return parse(str);
    },
    setItem: (name, newValue) =>
      storage.setItem(name, JSON.stringify(newValue)),
    removeItem: (name) => storage.removeItem(name),
  };
  return persistStorage;
}
