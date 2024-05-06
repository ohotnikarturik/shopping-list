import { ChevronsLeft, ChevronsRight, Settings } from "lucide-react"

interface Props {
  toggleSidebar: () => void
  isSidebarOpen: boolean
}

const AppBar = ({ toggleSidebar, isSidebarOpen }: Props) => {
  return (
    <header className="h-14 flex items-center justify-between p-4 shadow-bottom z-10 divide">
      <button onClick={toggleSidebar}>
        {isSidebarOpen ? (
          <ChevronsLeft size={20} />
        ) : (
          <ChevronsRight size={20} />
        )}
      </button>

      <div className="flex items-center gap-2">
        <button>
          <Settings size={20} />
        </button>
      </div>
    </header>
  )
}

export default AppBar
