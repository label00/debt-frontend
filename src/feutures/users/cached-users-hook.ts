import { useEffect } from 'react';
import { combine, createEvent, createStore, sample } from 'effector';
import { useUnit } from 'effector-react';
import { usersModel } from 'entities';

const $loaded = createStore(false);
const mounded = createEvent();
const filter$ = combine(
  $loaded.map((is) => !is),
  usersModel.$loading.map((is) => !is)
).map((data) => data.reduce((acc, value) => acc && value, true));

$loaded.on(usersModel.fetchUsersFx.done, () => true);

sample({
  clock: mounded,
  filter: filter$,
  target: usersModel.fetchUsersFx,
});

const useCachedUsersState = () => {
  const [state, moundedFn] = useUnit([usersModel.$usersState, mounded]);

  useEffect(() => {
    moundedFn();
  }, [moundedFn]);

  return state;
};
export { useCachedUsersState };
