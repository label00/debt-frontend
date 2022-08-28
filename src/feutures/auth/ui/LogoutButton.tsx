import { Button } from 'shared/ui';
import { userModel } from 'entities';

export const LogoutButton = () => {
  return (
    <Button size="small" color="secondary" variant="text" onClick={() => userModel.logout()}>
      Выйти
    </Button>
  );
};
