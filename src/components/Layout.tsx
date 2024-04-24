import { Outlet } from "react-router-dom"
import Navigation from "./Navigation"
import { Suspense } from "react"

const Layout = () => {
  return (
    <>
      <header>
        <h1>Shopping List app</h1>
        <Navigation />
      </header>
      <main>
        <Suspense fallback={<div>Page is Loading...</div>}>
          <Outlet />
        </Suspense>
      </main>
      <footer>Footer</footer>
    </>
  )
}
export default Layout
