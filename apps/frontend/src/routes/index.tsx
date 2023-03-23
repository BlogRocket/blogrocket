import { protectedRoutes } from "./protected"
import { publicRoutes } from "./public"
import { createBrowserRouter } from "react-router-dom"
import { lazyImport } from "@/utils/lazyImport"

const { Landing } = lazyImport(() => import('@/features/misc'), 'Landing')
const { NotFound } = lazyImport(() => import('@/features/misc'), 'NotFound')


const commonRoutes = [
  { path: '/', element: <Landing /> },
  { path: '/404', element: <NotFound /> },
  { path: '*', element: <NotFound /> }
]

export const router = createBrowserRouter([
  ...protectedRoutes,
  ...publicRoutes,
  ...commonRoutes
])