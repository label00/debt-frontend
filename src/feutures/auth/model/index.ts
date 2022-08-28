import { userModel } from '../../../entities';

export const $isAuth = userModel.$user.map((state) => !!state.id);
