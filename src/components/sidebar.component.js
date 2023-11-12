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
        <nav className="h-full flex flex-col bg-[#282C36]">
          <div className="p-4 pb-2 flex justify-between items-center">
            <span
              className={`text-2xl font-bold text-gray-400 overflow-hidden transition-all ${expanded ? "w-42" : "w-0"}`}>
              Gustock
            </span>
            <button
              onClick={() => setExpanded((curr) => !curr)}
              className="p-2.5 rounded-lg bg-gray-500 text-white">
              {expanded ? <ChevronFirst /> : <ChevronLast />}
            </button>
          </div>

          <SidebarContext.Provider value={{ expanded }}>
            <ul className="flex-1 mt-5 px-4">{children}</ul>
          </SidebarContext.Provider>

          <div className="bg-[#40434C] flex justify-center p-4">
            <div className="rounded border border-white p-2">
              <User className="text-white rounded m-auto" size={20}/>
              </div>
            <div
              className={`
              flex justify-between items-center
              overflow-hidden transition-all ${expanded ? "w-52 ml-3" : "w-0"}
          `}
            >
              <div className="leading-4">
                <h4 className="text-gray-300 font-medium mb-1">{username}</h4>
                <span className="text-xs text-gray-400">{rolname}</span>
              </div>
            </div>
          </div>
        </nav>
      </div>
    </aside>
  )
}

export function SidebarItem({ icon, text, active }) {
  const { expanded } = useContext(SidebarContext)

  return (
    <li
      className={`
        relative flex items-center py-2 px-3 my-1
        font-medium rounded-full cursor-pointer
        transition-colors group
        ${active
          ? "bg-gray-500 text-white"
          : "hover:bg-gray-500 text-white"
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
    </li>
  )
}