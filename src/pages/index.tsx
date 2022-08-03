import { Route, Routes } from "react-router-dom";
import { LoginPage } from "./login";
import { RequireAuth } from "../feutures";

export const Public = () => (<div>Public</div>)

export const Routing = () => {
  return (
    <Routes>
      <Route path="*" element={
        <RequireAuth>
          <Routes>
            <Route path="/" element={<Public/>}/>
          </Routes>
        </RequireAuth>
      }/>

      <Route path="/login" element={<LoginPage/>}/>
    </Routes>
  )
}