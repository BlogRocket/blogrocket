import { lazyImport } from '@/utils/lazyImport'

const { AuthRoute } = lazyImport(() => import('@/features/auth'), 'AuthRoute')

export const publicRoutes = [
  {
    path: '/*',
    element: <AuthRoute />
  }
]