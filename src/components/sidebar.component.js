import { createContext } from "react"

const SidebarContext = createContext()

export default function Sidebar({ children }) {
  return (
    <aside className="hidden lg:block bg-blue-900">
      <div className='w-[190px] min-h-screen'>
        <div className="p-5">
          <span className="hidden lg:block text-2xl text-white font-bold">GUSTOCK</span>
        </div>

        <nav className="flex flex-col">
          <SidebarContext.Provider>
            <ul className="flex-1 mt-2 px-2">{children}</ul>
          </SidebarContext.Provider>
        </nav>
      </div>
    </aside>
  )
}

export function SidebarItem({ icon, text, active }) {
  return (
    <li
      className={`
        relative flex items-center py-2 px-3 my-1
        font-medium rounded cursor-pointer
        transition-colors group
        ${active
          ? "hover:underline underline-offset-4 text-white"
          : "hover:underline underline-offset-4 text-white"
        }
    `}
    >
      {icon}
      <span
        className='overflow-hidden transition-all w-52 ml-3'
      >
        {text}
      </span>
    </li>
  )
}