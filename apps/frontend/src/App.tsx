import "./App.css"
import { Suspense } from "react";
import { RouterProvider } from "react-router-dom"
import { QueryClientProvider } from '@tanstack/react-query'
import { ErrorBoundary } from "react-error-boundary";
import { HelmetProvider } from "react-helmet-async";
import { router } from "@/routes";
import Spinner from "@/components/ui/Spinner";
import { queryClient } from "@/lib/react-query";
import Button from "@/components/ui/Button";

const ErrorFallback = () => {
  return (
    <div
      className="text-red-500 w-screen h-screen flex flex-col justify-center items-center"
      role="alert"
    >
      <h2 className="text-lg font-semibold">Oops, something went wrong :(</h2>
      <Button className="mt-4" onClick={() => window.location.assign(window.location.origin)}>
        Refresh
      </Button>
    </div>
  );
};

function App() {
  const fallback = (
    <div className="h-full w-full flex items-center justify-center">
      <Spinner />
    </div>
  )
  return (
    <main className="min-h-screen bg-gradient-to-r from-primary/[0.02] via-transparent to-secondary/[0.03]">
      <Suspense fallback={fallback}>
        <ErrorBoundary FallbackComponent={ErrorFallback}>
          <HelmetProvider>
            <QueryClientProvider client={queryClient}>
              <RouterProvider router={router} />
            </QueryClientProvider>
          </HelmetProvider>
        </ErrorBoundary>
      </Suspense>
    </main>
  )
}

export default App
