import { Route, Routes } from 'react-router-dom';
import { NewPost } from './NewPost';
import { ShowPost } from './ShowPost';


export const PostRoutes = () => (
  <Routes>
    <Route path="" element={<div>Post</div>} />
    <Route path=":postId" element={<ShowPost />} />
    <Route path=":postId/edit" element={<ShowPost />} />
    <Route path="new" element={<NewPost />} />
  </Routes>
)