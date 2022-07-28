import { Navigate, Route, Routes } from 'react-router-dom';
import { Dashboard, LoginPage, History } from 'pages';
import { Layout, LayoutSkeleton } from 'widgets';
import { attachNavigate } from 'shared/lib';
import { useEffect } from 'react';
import { initRouting } from 'processes/auth';

const _Routing = () => {
  useEffect(() => initRouting(), []);
  return (
    <Routes>
      <Route element={<LayoutSkeleton />}>
        <Route path="/">
          <Route element={<Layout />}>
            <Route index element={<Dashboard />}></Route>
            <Route path="history/:id" element={<History />}></Route>
          </Route>
        </Route>
      </Route>

      <Route path="/login" element={<LoginPage />} />
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
};

export const Routing = attachNavigate(_Routing);
