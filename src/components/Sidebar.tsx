import { BadgeInfo, ListTodo } from "lucide-react"
import { NavLink, useLocation } from "react-router-dom"

import Logo from "./Logo"
import { Routs } from "../routes/types"

interface Props {
  open: boolean
}

const Sidebar = ({ open }: Props) => {
  const location = useLocation()
  const contactsPage = location.pathname.includes("contacts")
  const calendarPage = location.pathname.includes("calendar")

  return (
    <aside
      className={`flex-shrink-0 ${
        open ? "w-[200px]" : "w-16"
      } h-full flex flex-col`}
    >
      <div className="h-14 px-4 flex items-center justify-center">
        <NavLink to={Routs.HOME}>
          <Logo textVisible={open} size={open ? undefined : 32} />
        </NavLink>
      </div>
      <div
        className={`flex flex-col gap-1 ${
          open ? "p-4" : "py-4 items-center"
        } overflow-auto flex-1`}
      >
        <NavLink
          to={Routs.LISTS}
          className={`gap-2 flex items-center transition-colors p-2 hover:bg-accent hover:text-primary cursor-pointer rounded-md ${
            contactsPage && "bg-accent text-primary"
          }`}
        >
          <ListTodo size={20} />
          {open && <span className="text-sm">Shopping lists</span>}
        </NavLink>
        <NavLink
          to={Routs.ABOUT}
          className={`gap-2 flex items-center transition-colors p-2 hover:bg-accent hover:text-primary cursor-pointer rounded-md ${
            calendarPage && "bg-accent text-primary"
          }`}
        >
          <BadgeInfo size={20} />
          {open && <span className="text-sm">About</span>}
        </NavLink>
      </div>
    </aside>
  )
}

export default Sidebar
