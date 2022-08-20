import { $user } from '../../../entities/user';

export const $isAuth = $user.map(state => !!state.id);
