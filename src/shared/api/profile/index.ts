import { baseFetch } from '../../lib';
import { User } from '../users';

export const getProfile = (): Promise<User> => baseFetch('/profile').then((res) => res.json());
