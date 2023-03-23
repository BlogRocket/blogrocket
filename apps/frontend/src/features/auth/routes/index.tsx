import { Route, Routes } from 'react-router-dom';
import Login from './Login';
import Register from './Register';
import Verify from './Verify';


export const AuthRoute = () => (
  <Routes>
    <Route path="login" element={<Login />} />
    <Route path="register" element={<Register />} />
    <Route path="verify" element={<Verify />} />
  </Routes>
)
