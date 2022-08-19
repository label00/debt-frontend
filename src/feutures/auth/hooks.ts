import { useLocalStorage } from '../../shared/hooks';
import { auth, User } from '../../shared/api';
import { USER_INFO } from '../../shared/consts';

type AuthHookType = {
  user: User | null;
  isAuth: boolean;
  login: (email: string, pass: string) => Promise<void>;
  logout: () => void;
}

export const useAuth = (): AuthHookType => {
  const [user, setUser] = useLocalStorage<User | null>(USER_INFO, null);
  const isAuth = !!user;

  const login = async (email: string, pass: string) => {
    const user = await auth(email, pass);
    setUser(user);
  }

  const logout = async () => {
    setUser(null);
  }


  return {user, isAuth, login, logout}
}
