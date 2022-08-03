import { useEffect } from "react";
import { User } from "@firebase/auth";
import { onAuthStateChanged, signIn, signOut } from "./model";
import { useLocalStorage } from "../../shared/hooks";

type AuthHookType = {
  user: User | null;
  isAuth: boolean;
  login: (email: string, pass: string) => Promise<void>;
  logout: () => void;
}

const USER_INFO = 'USER_INFO'

export const useAuth = (): AuthHookType => {
  const [user, setUser] = useLocalStorage<User | null>(USER_INFO, null);
  const isAuth = !!user;

  useEffect(() => {
    const unsub = onAuthStateChanged((user) => {
      setUser(user)
    })
    return () => unsub()
  }, [setUser])

  const login = async (email: string, pass: string) => {
    await signIn(email, pass);
  }

  const logout = async () => {
    await signOut()
    setUser(null);
  }


  return {user, isAuth, login, logout}
}