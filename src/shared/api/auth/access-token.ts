const USER_TOKEN = 'access_token';

export const getSavedToken = (): string | null => {
  return localStorage.getItem(USER_TOKEN);
};
export const saveUser = (token: string) => localStorage.setItem(USER_TOKEN, token);
export const clearUser = () => localStorage.removeItem(USER_TOKEN);
