import { Home, List, Lists, Profile, About } from "./lazyPages"
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
  { path: Routs.ABOUT, element: <About /> },
]

export default routes
