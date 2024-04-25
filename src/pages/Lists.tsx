import { useEffect, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { Routs } from "../routes/types"

interface List {
  id: string
  listName: string
}

const Lists = () => {
  const navigate = useNavigate()
  const [lists, setLists] = useState<List[]>([])
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [inputValue, setInputValue] = useState("")

  const createList = async (name: string) => {
    setIsLoading(true)
    const response = await fetch("http://localhost:7777/lists", {
      method: "POST",
      body: JSON.stringify({ id: name.toLowerCase(), name }),
      headers: {
        "Content-Type": "application/json",
      },
    })
    const list = await response.json()
    navigate(`${Routs.LISTS}/${list.id}`)
    setLists([...lists, list])
    setIsLoading(false)
    setIsModalOpen(false)
    setInputValue("")
  }

  useEffect(() => {
    const getLists = async () => {
      const response = await fetch("http://localhost:7777/lists")
      const data = await response.json()
      setLists(data)
      setIsLoading(false)
    }
    getLists()
  }, [])

  const renderLists = () => {
    if (isLoading) return <div>Loading...</div>
    if (lists.length === 0) return <div>Let's plan your shopping!</div>
    return lists.map((list) => (
      <Link key={list.id} to={`/lists/${list.id}`}>
        {list.listName}
      </Link>
    ))
  }

  const renderModal = () => {
    return (
      <div className=" border">
        <div>
          <h4>Create a new list</h4>
          <button
            className="bg-slate-400"
            onClick={() => setIsModalOpen(false)}
          >
            x
          </button>
        </div>
        <input
          type="text"
          name="newList"
          id="newList"
          placeholder="New List"
          value={inputValue}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            setInputValue(e.target.value)
          }}
        />
        <button className="bg-slate-400" onClick={() => createList(inputValue)}>
          Save
        </button>
      </div>
    )
  }

  return (
    <div>
      <h2>My Lists</h2>

      {renderLists()}

      {!isModalOpen && (
        <button className="bg-slate-400" onClick={() => setIsModalOpen(true)}>
          + Add new list
        </button>
      )}

      {isModalOpen && renderModal()}
    </div>
  )
}
export default Lists
