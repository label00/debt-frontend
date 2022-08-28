import { Layout } from '../../shared/ui';
import { Link } from 'react-router-dom';
import { LogoutButton } from '../../feutures/auth';
import { userModel } from '../../entities';
import { useStore } from 'effector-react';

export const Header = () => {
  const { name } = useStore(userModel.$user);
  const initial = name?.at(0) ?? 'N';

  return (
    <Layout.Header>
      <div className="flex items-center justify-between">
        <Link to="/">
          <img src="/src/shared/assets/image/logo.png" className="w-12" alt="logo" />
        </Link>
        <div className="flex gap-2 items-center">
          <LogoutButton />
          <div className="w-10 h-10 bg-indigo-400 rounded-full flex justify-center items-center">
            <span className="text-white text-xl font-bold uppercase select-none">{initial}</span>
          </div>
        </div>
      </div>
    </Layout.Header>
  );
};
