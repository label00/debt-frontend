import { Navigate, Outlet, Route, Routes } from 'react-router-dom';
import { LoginPage } from './login';
import { RequireAuth } from '../feutures';
import { Header } from '../widget';
import { Layout as SharedLayout } from '../shared/ui';
import { Dashboard } from './dashboard';

const Layout = () => (
  <>
    <Header></Header>
    <SharedLayout.Content>
      <Outlet/>
    </SharedLayout.Content>
  </>
)

export const Routing = () => {
  return (
    <Routes>
      <Route path="/" element={<RequireAuth/>}>
        <Route element={<Layout/>}>
          <Route index element={<Dashboard/>}></Route>
          <Route path="history" element={'History'}></Route>
        </Route>
      </Route>

      <Route path="/login" element={<LoginPage/>}/>
      <Route path="*" element={<Navigate to="/"/>}/>
    </Routes>
  )
}
