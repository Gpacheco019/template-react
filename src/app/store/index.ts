import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';
import { Store } from './slices/Store';
import { createCounterSlice } from './slices/counterSlice';
import { createUserSlice } from './slices/userSlice';

export const useStore = create<Store>()(
  devtools(
    immer(
      (...params) => ({
        counter: createCounterSlice(...params),
        user: createUserSlice(...params),     
      })
    ),
    {
      enabled: import.meta.env.DEV,
    }
  )
);
