import { useContext, createContext, useState } from "react"
import { ChevronLast, ChevronFirst, User } from "lucide-react"

import UserContext from '../user.context'

const SidebarContext = createContext()

export default function Sidebar({ children }) {
  const [user, setUser] = useContext(UserContext)
  const [expanded, setExpanded] = useState(false)

  const username = user.sub
  const rolname = user.roles.match(/ROLE_(\w+)/)[1]

  return (
    <aside className="hidden lg:block">
      <div className={`h-screen ${expanded ? "w-[225px]" : "w-auto"}`}>
        <nav className="h-full flex flex-col bg-white border-r shadow-sm">
          <div className="p-4 pb-2 flex justify-between items-center">
            <span
              className={`text-2xl font-bold text-blue-600 overflow-hidden transition-all ${expanded ? "w-42" : "w-0"}`}>
              Gustock
            </span>
            <button
              onClick={() => setExpanded((curr) => !curr)}
              className="p-2.5 rounded-lg bg-blue-600 text-white">
              {expanded ? <ChevronFirst /> : <ChevronLast />}
            </button>
          </div>

          <SidebarContext.Provider value={{ expanded }}>
            <ul className="flex-1 mt-5 px-4">{children}</ul>
          </SidebarContext.Provider>

          <div className="border-t flex justify-center p-4">
            <div className="rounded border border-blue-600 p-2">
              <User className="text-blue-600 rounded m-auto" size={20} />
            </div>
            <div
              className={`
              flex justify-between items-center
              overflow-hidden transition-all ${expanded ? "w-52 ml-3" : "w-0"}
          `}
            >
              <div className="leading-4">
                <h4 className="text-gray-600 font-medium">{username}</h4>
                <span className="text-xs text-gray-500">{rolname}</span>
              </div>
            </div>
          </div>
        </nav>
      </div>
    </aside>
  )
}

export function SidebarItem({ icon, text, active, alert }) {
  const { expanded } = useContext(SidebarContext)

  return (
    <li
      className={`
        relative flex items-center py-2 px-3 my-1
        font-medium rounded-md cursor-pointer
        transition-colors group
        ${active
          ? "border border-blue-600 text-blue-600"
          : "hover:border hover:border-blue-600 text-gray-500"
        }
    `}
    >
      {icon}
      <span
        className={`overflow-hidden transition-all ${expanded ? "w-52 ml-3" : "w-0"
          }`}
      >
        {text}
      </span>
      {alert && (
        <div
          className={`absolute right-2 w-2 h-2 rounded bg-blue-400 ${expanded ? "" : "top-2"
            }`}
        />
      )}

      {!expanded && (
        <div
          className={`
          absolute left-full rounded-md px-2 py-1 ml-6
          bg-blue-100 text-blue-600 text-sm z-10
          invisible opacity-20 -translate-x-3 transition-all
          group-hover:visible group-hover:opacity-100 group-hover:translate-x-0
      `}
        >
          {text}
        </div>
      )}
    </li>
  )
}