const USER_TOKEN = 'access_token';

export const getSavedToken = (): string | null => {
  return localStorage.getItem(USER_TOKEN);
};
export const saveAccessToken = (token: string) => localStorage.setItem(USER_TOKEN, token);
export const clearAccessToken = () => localStorage.removeItem(USER_TOKEN);
