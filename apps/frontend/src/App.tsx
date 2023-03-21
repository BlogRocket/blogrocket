import { RouterProvider } from "react-router-dom"
import { QueryClientProvider } from '@tanstack/react-query'
import "./App.css"
import { router } from "./routes";
import { Suspense } from "react";
import Spinner from "@/components/ui/Spinner";
import { queryClient } from "@/lib/react-query";

function App() {
  const fallback = (
    <div className="h-full w-full flex items-center justify-center">
      <Spinner />
    </div>
  )
  return (
    <main className="min-h-screen bg-gradient-to-r from-primary/[0.02] via-transparent to-secondary/[0.03]">
      <Suspense fallback={fallback}>
        <QueryClientProvider client={queryClient}>
          <RouterProvider router={router} />
        </QueryClientProvider>
      </Suspense>
    </main>
  )
}

export default App
