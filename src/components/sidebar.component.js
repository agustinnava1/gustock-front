import { useContext, createContext, useState } from "react"
import { ChevronLast, ChevronFirst } from "lucide-react"

const SidebarContext = createContext()

export default function Sidebar({ children }) {
  const [expanded, setExpanded] = useState(false)

  return (
    <aside className="bg-white hidden lg:block min-h-screen border-r">
      <div className={`${expanded ? "w-[225px]" : "w-auto"}`}>
        <nav>
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
          ? "bg-blue-600 text-white"
          : "hover:bg-blue-600 hover:text-white text-blue-600"
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