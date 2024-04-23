import { Link, Outlet } from "react-router-dom"

const Lists = () => {
  return (
    <div>
      <div>
        <Link to="/lists/1">List 1</Link>
        <Link to="/lists/2">List 2</Link>
        <Outlet />
      </div>
    </div>
  )
}
export default Lists
