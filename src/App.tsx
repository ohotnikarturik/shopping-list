import { RouterProvider, createBrowserRouter } from "react-router-dom"

import Lists from "./pages/Lists"
import Profile from "./pages/Profile"
import NotFoundPage from "./pages/NotFoundPage"
import Layout from "./components/Layout"
import List from "./pages/List"

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    errorElement: <NotFoundPage />,
    children: [
      {
        path: "lists",
        element: <Lists />,
      },
      {
        path: "/lists/:listId",
        element: <List />,
      },
      {
        path: "profile",
        element: <Profile />,
      },
    ],
  },
])

function App() {
  return <RouterProvider router={router} />
}

export default App
