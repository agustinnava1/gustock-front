import { useState } from 'react'

export default function Header() {
  const [visible, setVisible] = useState(false);

  const user = JSON.parse(localStorage.getItem("loggedUser"));
  const rol = user.rol.match(/\[ROLE_(.*?)\]/)[1];

  return (
    <nav className='flex justify-between bg-white border-b w-full p-4'>
      <span className='flex-auto text-2xl font-bold text-blue-500 ms-2 my-auto'>GUSTOCK</span>
    </nav>
  )
}
