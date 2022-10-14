import { DependencyList, useMemo } from "react";

type MapFn<T extends Array<any>, Idx extends keyof T, R> = (
  item: T[Idx],
  index: Idx,
  array: T
) => R;

function mapOverArray<T extends Array<any>, F extends MapFn<T, number, R>, R>(
  array: T,
  fn: F
): Array<R> {
  return array.map(fn as any);
}

const useMapOverArray = <T extends any[], C>(
  list: T,
  fn: MapFn<T, number, C>,
  deps: DependencyList | undefined
): Array<C> =>
  useMemo(() => mapOverArray(list, fn), [fn, list, ...(deps || [])]);

export default useMapOverArray;
