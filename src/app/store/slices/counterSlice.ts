import { StoreSlice } from './Store';

type CounterStore = {
  value: number;
};

type CounterActions = {
  increment: () => void;
  decrement: () => void;
};

export type CounterSlice = CounterStore & CounterActions;

export const createCounterSlice: StoreSlice<CounterSlice> = set => ({
  value: 0,
  increment: () =>
    set(prev => {
      prev.counter.value++;
    }),
  decrement: () =>
    set(prev => {
      prev.counter.value--;
    }),
});
