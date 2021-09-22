import { writable } from 'svelte/store';
import type { IUser } from 'src/interfaces/IUser';

let user = writable<IUser>({
  id: null,
  uid: null,
  username: null,
  name: null,
  email: null,
  age: null,
  joined: null,
  fitcoins: null
});

export const userStore = {
  subscribe: user.subscribe,
  updateUser: (u: any): void => user.update(() => user = { ...user, ...u }),
};