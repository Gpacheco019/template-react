import { UserSlice } from './userSlice';
import { CounterSlice } from './counterSlice';
import { StateCreator } from 'zustand';

export type Store = {
  user: UserSlice;
  counter: CounterSlice;
};

export type StoreSlice<TStoreSlice> = StateCreator<
  Store, 
  [
    ['zustand/devtools', never],
    ['zustand/immer', never],
  ], 
  [], 
  TStoreSlice
>