import { Link } from "react-router-dom"
import { Routs } from "../routes/types"

// if user has lists redirect to lists page
const Home = () => {
  return (
    <div>
      <div>Welcome to shopping list 🛒</div>
      <div>Here you can plan, create, edit, and delete list of products</div>
      <div>
        Go and create your first list <Link to={Routs.LISTS}>here</Link>
      </div>
    </div>
  )
}
export default Home
