import Home from "../pages/Home"
import List from "../pages/List"
import Lists from "../pages/Lists"
import Profile from "../pages/Profile"
import { Routs } from "./types"

const routes = [
  { path: Routs.HOME, element: <Home /> },

  {
    path: Routs.LISTS,
    element: <Lists />,
  },
  {
    path: Routs.LIST,
    element: <List />,
  },
  {
    path: Routs.PROFILE,
    element: <Profile />,
  },
  // { path: Routs.ABOUT, element: <About /> },
]

export default routes
