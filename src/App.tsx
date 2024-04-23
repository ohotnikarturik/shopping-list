import { RouterProvider, createBrowserRouter } from "react-router-dom"

import Home from "./pages/Home"
import NotFoundPage from "./pages/NotFoundPage"

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
    errorElement: <NotFoundPage />,
  },
])

function App() {
  return <RouterProvider router={router} />
}

export default App
