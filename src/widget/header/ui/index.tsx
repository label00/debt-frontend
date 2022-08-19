import { Button, Layout } from '../../../shared/ui';
import { Link } from 'react-router-dom';
import { useAuth } from '../../../feutures/auth';

export const Header = () => {
  const { logout, user } = useAuth();
  const initial = user?.name.at(0) ?? 'N';

  return (
    <Layout.Header>
      <div className="flex items-center justify-between">
        <Link to="/">
          <img src="/image/logo.png" className="w-12" alt="logo"/>
        </Link>
        <div className="flex gap-2 items-center">
          <Button size="small" color="secondary" variant="text" onClick={() => logout()}>Выйти</Button>
          <div className="w-10 h-10 bg-indigo-400 rounded-full flex justify-center items-center">
            <span className="text-white text-xl font-bold uppercase select-none">{initial}</span>
          </div>
        </div>
      </div>
    </Layout.Header>
  )
}
