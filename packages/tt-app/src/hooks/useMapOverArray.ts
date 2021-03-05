import { DependencyList, useMemo } from "react";

type ArrayItem<T extends readonly unknown[]> = T extends readonly (infer I)[]
  ? I
  : never;

const useMapOverArray = <T extends readonly unknown[], C>(
  list: T,
  factory: (item: ArrayItem<T>, index: number, array: T) => C,
  deps: DependencyList | undefined
): Array<C> =>
  useMemo(
    () =>
      list.map(
        (factory as unknown) as (
          item: unknown,
          index: number,
          array: readonly unknown[]
        ) => C
      ),
    [factory, list].concat(deps || [])
  );

export default useMapOverArray;
