import { RouterProvider, createBrowserRouter } from "react-router-dom"

import NotFoundPage from "./pages/NotFoundPage"
import Layout from "./components/Layout"
import routes from "./routes"

const router = createBrowserRouter([
  {
    element: <Layout />,
    errorElement: <NotFoundPage />,
    children: routes,
  },
])

function App() {
  return <RouterProvider router={router} />
}

export default App
