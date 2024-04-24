import { Outlet } from "react-router-dom"
import Navigation from "./Navigation"

const Layout = () => {
  return (
    <>
      <header>
        <h1>Shopping List app</h1>
        <Navigation />
      </header>
      <main>
        <Outlet />
      </main>
      <footer>Footer</footer>
    </>
  )
}
export default Layout
