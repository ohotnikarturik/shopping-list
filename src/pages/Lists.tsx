import { useEffect, useState } from "react"
import { Link } from "react-router-dom"

interface List {
  id: string
  name: string
}

const Lists = () => {
  const [lists, setLists] = useState<List[]>([])
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [inputValue, setInputValue] = useState("")

  const createList = async (listName: string) => {
    setIsLoading(true)
    const response = await fetch("http://localhost:7777/lists", {
      method: "POST",
      body: JSON.stringify({ id: listName.toLowerCase(), name: listName }),
      headers: {
        "Content-Type": "application/json",
      },
    })
    const data = await response.json()
    setLists([...lists, data])
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
        {list.name}
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
