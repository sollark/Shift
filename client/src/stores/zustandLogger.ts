import { log } from "@/service/console.service";
import { StateCreator, StoreMutatorIdentifier } from "zustand";

type Logger = <
  T,
  Mps extends [StoreMutatorIdentifier, unknown][] = [],
  Mcs extends [StoreMutatorIdentifier, unknown][] = []
>(
  f: StateCreator<T, Mps, Mcs>,
  name?: string
) => StateCreator<T, Mps, Mcs>;

type LoggerImpl = <T>(
  f: StateCreator<T, [], []>,
  name?: string
) => StateCreator<T, [], []>;

const loggerImpl: LoggerImpl = (f, name) => (set, get, store) => {
  const loggedSet: typeof set = ((partial: any, replace?: any) => {
    if (replace === true) {
      (set as any)(partial, true);
    } else {
      (set as any)(partial, replace);
    }
    log(...(name ? [`${name}:`] : []), get());
  }) as typeof set;
  store.setState = loggedSet;

  return f(loggedSet, get, store);
};

export const zustandLogger = loggerImpl as unknown as Logger;
