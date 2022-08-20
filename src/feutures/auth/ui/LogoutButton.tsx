import { Button } from '../../../shared/ui';
import { logout } from '../../../entities/user';

export const LogoutButton = () => {
  return <Button size="small" color="secondary" variant="text" onClick={() => logout()}>Выйти</Button>
}
