/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Models } from "@rematch/core";
import { createTransform, Transform } from "redux-persist";

export type ModelTransforms<
  TModels extends Models<TModels>,
  TModelTransforms extends ModelTransforms<TModels, TModelTransforms>
> = {
  [K in keyof TModels]?: Transform<any, any, any, any>;
};

type InferTransformEss<T> = T extends Transform<any, infer V, any, any>
  ? V
  : never;

type StateValue<
  K extends keyof TModels,
  TModels extends Models<TModels>
> = K extends keyof TModels ? TModels[K]["state"] : never;

export type State<TModels extends Models<TModels>> = {
  [K in keyof TModels]: StateValue<K, TModels>;
};

type IsModelKey<K, TModels extends Models<TModels>> = K extends keyof TModels
  ? K
  : never;
type IsTransformKey<
  K,
  TModels extends Models<TModels>,
  TModelTransforms extends ModelTransforms<TModels, TModelTransforms>
> = K extends keyof TModelTransforms ? K : never;

export type SerializedState<
  TModels extends Models<TModels>,
  TModelTransforms extends ModelTransforms<TModels, TModelTransforms>
> = {
  [K in keyof TModels | keyof TModelTransforms]: K extends IsTransformKey<
    K,
    TModels,
    TModelTransforms
  >
    ? InferTransformEss<TModelTransforms[K]>
    : K extends IsModelKey<K, TModels>
    ? StateValue<K, TModels>
    : never;
};

type ModelsTransform<
  TModels extends Models<TModels>,
  TModelTransforms extends ModelTransforms<TModels, TModelTransforms>
> = Transform<
  any,
  any,
  State<TModels>,
  SerializedState<TModels, TModelTransforms>
>;

type InferModels<T> = T extends ModelTransforms<infer TModels, any>
  ? TModels
  : never;

const createModelsTransform = <
  TModelTransforms extends ModelTransforms<TModels, TModelTransforms>,
  TModels extends Models<TModels> = InferModels<TModelTransforms>
>(
  transforms: TModelTransforms
): ModelsTransform<TModels, TModelTransforms> =>
  createTransform(
    (state, key, rootState) => {
      const nestedTransforms = transforms[key];
      if (!nestedTransforms) {
        return state;
      }
      return nestedTransforms.in(state, key, rootState);
    },
    (state, key, rawRootState) => {
      const nestedTransforms = transforms[key];
      if (!nestedTransforms) {
        return state;
      }
      return nestedTransforms.out(state, key, rawRootState);
    }
  );

export default createModelsTransform;
