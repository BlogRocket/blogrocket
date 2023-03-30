import { Route, Routes } from 'react-router-dom';
import { ManageAccess } from './ManageAccess';
import { NewAccessToken } from './NewAccessToken';


export const ManageAccessRoutes = () => (
  <Routes>
    <Route path="" element={<ManageAccess />} />
    <Route path="new" element={<NewAccessToken />} />
  </Routes>
)