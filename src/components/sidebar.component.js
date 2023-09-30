import { useContext, createContext, useState } from "react"
import { ChevronLast, ChevronFirst, LogOut } from "lucide-react"
import { Button } from "primereact/button"

const SidebarContext = createContext()

export default function Sidebar({ children }) {
  const [expanded, setExpanded] = useState(false)

  const usuario = JSON.parse(localStorage.getItem("loggedUser"));
  const rol = usuario.rol.match(/\[ROLE_(.*?)\]/)[1];

  return (
    <aside className="hidden lg:flex min-h-screen">
      <nav className="flex flex-col bg-[#3B71CA]">
        <div className="p-4 pb-2 flex justify-between items-center">
          <span
            className={`text-2xl font-bold text-white overflow-hidden transition-all ${expanded ? "w-42" : "w-0"}`}>
            Navegación
          </span>
          <button
            onClick={() => setExpanded((curr) => !curr)}
            className="p-2.5 rounded-lg bg-white">
            {expanded ? <ChevronFirst /> : <ChevronLast />}
          </button>
        </div>

        <SidebarContext.Provider value={{ expanded }}>
          <ul className="flex-1 mt-5 px-4">{children}</ul>
        </SidebarContext.Provider>

        <div className="border-t flex p-3">
        <Button icon={<LogOut size={20} />} severity="info" />
          <div
            className={`
              flex justify-between items-center
              overflow-hidden transition-all ${expanded ? "w-52 ml-3" : "w-0"}
          `}
          >
            <div className="leading-4">
              <h4 className="font-semibold">Cerrar sesión</h4>
            </div>
          </div>
        </div>
      </nav>
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
          ? "bg-white text-[#1764C6]"
          : "hover:bg-white hover:text-[#1764C6] text-white"
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
          bg-blue-100 text-blue-800 text-sm z-10
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