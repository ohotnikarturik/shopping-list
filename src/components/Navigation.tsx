import { Link } from "react-router-dom"

import { Routs } from "../routes/types"

const Navigation = () => {
  return (
    <nav>
      <Link to={Routs.LISTS}>Lists</Link>
      <Link to={Routs.PROFILE}>Profile</Link>
    </nav>
  )
}
export default Navigation
