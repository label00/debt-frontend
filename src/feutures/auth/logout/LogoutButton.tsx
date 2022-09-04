import { Button } from 'shared/ui';
import { viewerModel } from 'entities';

export const LogoutButton = () => {
  return (
    <Button size="small" color="secondary" variant="text" onClick={() => viewerModel.logout()}>
      Выйти
    </Button>
  );
};
