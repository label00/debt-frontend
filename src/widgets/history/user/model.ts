import { createUserModel } from 'entities/user';
import { useEffect } from 'react';
import { createEvent, sample, combine } from 'effector';
import { not } from 'patronum';
import { useStore } from 'effector-react';

export const userModel = createUserModel();
const moundedUserComponent = createEvent<string>();
const state = combine([userModel.$user, userModel.$loaded, userModel.$error]);

sample({
  clock: moundedUserComponent,
  filter: not(userModel.$loading),
  target: userModel.fetchUserFx,
});

export const useUserModel = (id: string) => {
  const [user, loaded, error] = useStore(state);

  useEffect(() => {
    moundedUserComponent(id);
  }, [id]);

  return { user, loaded, error };
};
