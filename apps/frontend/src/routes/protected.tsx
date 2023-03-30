import { AuthLoader } from "@/lib/auth"
import { Layout } from "@/components/container"
import Spinner from "@/components/ui/Spinner"
import { Navigate, Outlet } from "react-router-dom"
import { PropsWithChildren, Suspense } from "react"
import { lazyImport } from "@/utils/lazyImport"

const { Dashboard } = lazyImport(() => import('@/features/misc'), 'Dashboard')
const { ManageAccessRoutes } = lazyImport(() => import('@/features/access'), 'ManageAccessRoutes')
const { PostRoutes } = lazyImport(() => import('@/features/post'), 'PostRoutes')


const Protected: React.FC<PropsWithChildren> = ({ children }) => {
  const fallback = (
    <div className="h-full w-full flex items-center justify-center">
      <Spinner light />
    </div>
  )

  return (
    <AuthLoader
      renderLoading={() => fallback}
      renderUnauthenticated={() => <Navigate to="/login" />}
    >
      {children}
    </AuthLoader>
  )
}


const App = () => {
  const fallback = (
    <div className="h-screen w-full flex items-center justify-center">
      <Spinner light />
    </div>
  )
  return (
    <Layout>
      <Suspense fallback={fallback}>
        <Outlet />
      </Suspense>
    </Layout>
  )
}

export const protectedRoutes = [
  {
    path: '/app',
    element: <Protected><App /></Protected>,
    children: [
      { path: '', element: <Dashboard /> },
      { path: 'access/*', element: <ManageAccessRoutes /> },
      { path: 'post/*', element: <PostRoutes /> },
    ]
  }
]