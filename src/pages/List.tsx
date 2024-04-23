import { useParams } from "react-router-dom"

const List = () => {
  const { listId } = useParams()
  return <div>List:{listId}</div>
}
export default List
