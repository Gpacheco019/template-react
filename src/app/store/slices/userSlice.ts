import { StoreSlice } from './Store';

type UserStore = {
  data: {
    useName: string;
    email: string;
    lastname: string;
  }
}

type UserActions = {
  setUserName: (useName: string) => void;
}

export type UserSlice = UserStore & UserActions;

export const createUserSlice: StoreSlice<UserSlice> = (set) => ({
  data: {
    useName: 'Gpacheco019',
    email: 'gpacheco019@gmail.com',
    lastname: 'Pacheco',
  },
  setUserName: (useName: string) => set(prev => {
    prev.user.data.useName = useName;
  }),
});