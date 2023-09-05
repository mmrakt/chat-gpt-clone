import { Dispatch, SetStateAction } from "react";
import { LocalStorageKey } from "../../constants";
import { useLocalStorage, useReadLocalStorage } from "usehooks-ts";

type SetValue<T> = Dispatch<SetStateAction<T>>;

export function useStorage<T>(
  key: LocalStorageKey,
  initialValue: T,
): [T, SetValue<T>] {
  return useLocalStorage(key, initialValue);
}

type Value<T> = T | null;

export function useReadStorage<T>(key: LocalStorageKey): Value<T> {
  return useReadLocalStorage(key);
}
