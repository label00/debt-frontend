import { User } from '../users/types';

const USER_TOKEN = 'access_token';

export const getSavedUser = (): User | null => {
  const user = localStorage.getItem(USER_TOKEN);
  return user ? JSON.parse(user) : null;
};
export const saveUser = (user: User) => localStorage.setItem(USER_TOKEN, JSON.stringify(user));
export const clearUser = () => {
  localStorage.removeItem(USER_TOKEN);
};

export const getCurrentUser = (): User => {
  const user = getSavedUser();
  if (!user) {
    throw 'Юзер не авторизован';
  }
  return user;
};
