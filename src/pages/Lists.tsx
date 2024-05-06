import { useEffect, useState } from "react"
import { Link, useNavigate } from "react-router-dom"

import { Routs } from "../routes/types"
import Dialog from "../components/Dialog"

interface List {
  id: string
  listName: string
}

const Lists = () => {
  const navigate = useNavigate()
  const [lists, setLists] = useState<List[]>([])
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [inputValue, setInputValue] = useState("")

  const createList = async (name: string) => {
    setIsLoading(true)
    const response = await fetch("http://localhost:7777/lists", {
      method: "POST",
      body: JSON.stringify({ id: name.toLowerCase(), listName: name }),
      headers: {
        "Content-Type": "application/json",
      },
    })
    const list = await response.json()
    navigate(`${Routs.LISTS}/${list.id}`)
    setLists([...lists, list])
    setIsLoading(false)
    setIsDialogOpen(false)
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
    return (
      <ul>
        {lists.map((list) => (
          <li key={list.id}>
            <Link to={`/lists/${list.id}`}>{list.listName}</Link>
          </li>
        ))}
      </ul>
    )
  }

  const renderDialogContent = () => {
    return (
      <div>
        <label
          htmlFor="listName"
          className="block text-sm font-medium leading-6 text-gray-900"
        >
          List Name
        </label>
        <input
          type="text"
          name="listName"
          placeholder="List name..."
          id="listName"
          value={inputValue}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            setInputValue(e.target.value)
          }}
          className="w-full rounded-md border-0 py-1.5 px-3 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-500 outline-none"
        />
      </div>
    )
  }

  return (
    <div>
      <div className="flex justify-between">
        <h2 className="text-lg font-semibold text-gray-900">
          Your shopping lists
        </h2>
        <button className="bg-slate-400" onClick={() => setIsDialogOpen(true)}>
          + Add new list
        </button>
      </div>

      {renderLists()}

      {isDialogOpen && (
        <Dialog
          open={isDialogOpen}
          onClose={() => setIsDialogOpen(false)}
          onConfirm={() => createList(inputValue)}
          title="Create a new list"
          confirmBtnName="Create"
          loading={isLoading}
        >
          {renderDialogContent()}
        </Dialog>
      )}
    </div>
  )
}
export default Lists
