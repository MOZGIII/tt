/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Models, RematchRootState } from "@rematch/core";
import { createTransform, Transform } from "redux-persist";
import type { ValueOf } from "type-fest";

export type Transforms<
  TModels extends Models<TModels>,
  TTransforms extends Transforms<TModels, TTransforms>
> = {
  [K in keyof TModels]?: Transform<any, any, any, any>;
};

type EndStateValue<
  K extends keyof TModels | keyof TTransforms,
  TModels extends Models<TModels>,
  TTransforms extends Transforms<TModels, TTransforms>
> = K extends keyof TTransforms
  ? TTransforms[K] extends Transform<any, infer V, any, any>
    ? V
    : never
  : K extends keyof TModels
  ? TModels[K]["state"]
  : never;

export type EndState<
  TModels extends Models<TModels>,
  TTransforms extends Transforms<TModels, TTransforms>
> = {
  [K in keyof TModels | keyof TTransforms]: EndStateValue<
    K,
    TModels,
    TTransforms
  >;
};

type RootTransform<
  TModels extends Models<TModels>,
  TTransforms extends Transforms<TModels, TTransforms>
> = Transform<
  ValueOf<RematchRootState<TModels>>,
  any,
  RematchRootState<TModels>,
  EndState<TModels, TTransforms>
>;

const rootTransform = <
  TModels extends Models<TModels>,
  TTransforms extends Transforms<TModels, TTransforms>
>(
  transforms: TTransforms
): RootTransform<TModels, TTransforms> =>
  createTransform(
    (state, key, rootState) => {
      const nestedTransforms = transforms[key];
      if (!nestedTransforms) {
        return state;
      }
      return nestedTransforms.in(state, key, rootState);
    },
    (state, key, rootState) => {
      const nestedTransforms = transforms[key];
      if (!nestedTransforms) {
        return state;
      }
      return nestedTransforms.out(state, key, rootState);
    }
  );

export default rootTransform;
