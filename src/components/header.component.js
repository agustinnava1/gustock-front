import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext"

export default function Header() {
  const user = JSON.parse(localStorage.getItem("loggedUser"));
  const rol = user.rol.match(/\[ROLE_(.*?)\]/)[1];

  return (
    <nav className="flex justify-between bg-white w-full p-4">
      <span className="flex-1 p-input-icon-left">
        <Button label='Buscar producto' className="hover:!bg-blue-600" size="small"></Button>
      </span>
      <span className="text-xl font-semibold text-blue-500 my-auto">{user.name} | {rol}</span>
    </nav>
  )
}

