import { InputText } from "primereact/inputtext"

export default function Header() {
  const user = JSON.parse(localStorage.getItem("loggedUser"));
  const rol = user.rol.match(/\[ROLE_(.*?)\]/)[1];

  return (
    <nav className="flex justify-between bg-white w-full p-4">
      <span className="flex-1 p-input-icon-left">
        <i className="pi pi-search" />
        <InputText placeholder="Buscar producto por código, código de barras o descripción" className="p-inputtext-sm" />
      </span>
      <span className="text-2xl font-semibold text-blue-500 my-auto">{user.name} | {rol}</span>
    </nav>
  )
}

