import { Button } from "primereact/button"

export const MensajeriaPagina = () => {
  return (
    <div class="flex h-screen overflow-hidden">

      <div class="w-1/4 bg-white border-r border-gray-300">
        <div class="p-4 border-b border-gray-300 flex justify-between items-center bg-blue-600">
          <h1 class="text-2xl font-semibold !text-white">Conversaciones</h1>
        </div>

        <div class="overflow-y-auto h-screen p-3 mb-9 pb-20">
          <div class="flex items-center mb-4 cursor-pointer hover:bg-gray-100 p-2 rounded-md">
            <div class="w-12 h-12 bg-gray-300 rounded-full mr-3">
              <img src="https://placehold.co/200x/ffa8e4/ffffff.svg?text=ʕ•́ᴥ•̀ʔ&font=Lato" alt="User Avatar" class="w-12 h-12 rounded-full"></img>
            </div>
            <div class="flex-1">
              <h2 class="text-lg font-semibold">Sujeto 1</h2>
              <p class="text-gray-600">Mensaje de prueba</p>
            </div>
          </div>
        </div>
      </div>


      <div class="flex-1 relative">
        <div class="bg-white p-4 text-gray-700">
          <h1 class="text-2xl font-semibold">Sujeto 1</h1>
        </div>


        <div class="h-screen overflow-y-auto p-4 pb-36">
          <div class="flex mb-4 cursor-pointer">
            <div class="w-9 h-9 rounded-full flex items-center justify-center mr-2">
              <img src="https://placehold.co/200x/ffa8e4/ffffff.svg?text=ʕ•́ᴥ•̀ʔ&font=Lato" alt="User Avatar" class="w-8 h-8 rounded-full"></img>
            </div>
            <div class="flex max-w-96 bg-white rounded-lg p-3 gap-3">
              <p class="text-gray-700">Mensaje de prueba</p>
            </div>
          </div>


          <div class="flex justify-end mb-4 cursor-pointer">
            <div class="flex max-w-96 bg-blue-500 text-white rounded-lg p-3 gap-3">
              <p>Mensaje de prueba</p>
            </div>
            <div class="w-9 h-9 rounded-full flex items-center justify-center ml-2">
              <img src="https://placehold.co/200x/b7a8ff/ffffff.svg?text=ʕ•́ᴥ•̀ʔ&font=Lato" alt="My Avatar" class="w-8 h-8 rounded-full"></img>
            </div>
          </div>
        </div>

        <div class="bg-white border-t border-gray-300 p-4 absolute bottom-0 w-full">
          <div class="flex items-center">
            <input type="text" placeholder="Type a message..." class="w-full p-2 rounded-md border border-gray-400 focus:outline-none focus:border-blue-500"></input>
            <button class="bg-blue-500 text-white px-4 py-2 rounded-md ml-2">Enviar</button>
          </div>
        </div>
      </div>
    </div>
  )
}