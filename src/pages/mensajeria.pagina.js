import { Button } from "primereact/button"

export const MensajeriaPagina = () => {
  return (
    <div className="p-5">
      <div class="bg-white shadow-md rounded-lg container mx-auto">
        <div class="min-w-full border rounded lg:grid lg:grid-cols-3">
          <div class="border-r border-gray-300 lg:col-span-1">
            <ul class="overflow-auto h-[32rem]">
              <h2 class="ps-5 py-4 text-2xl font-medium border-b border-gray-300">Conversaciones</h2>
              <li>
                <a
                  class="flex items-center px-3 py-2 text-sm transition duration-150 ease-in-out border-b border-gray-300 cursor-pointer hover:bg-gray-100 focus:outline-none">
                  <img class="object-cover w-10 h-10 rounded-full"
                    src="https://cdn.pixabay.com/photo/2018/09/12/12/14/man-3672010__340.jpg" alt="username" />
                  <div class="w-full pb-2">
                    <div class="flex justify-between">
                      <span class="block ml-2 font-semibold text-gray-600">Jhon Don</span>
                      <span class="block ml-2 text-sm text-gray-600">25 minutes</span>
                    </div>
                    <span class="block ml-2 text-sm text-gray-600">bye</span>
                  </div>
                </a>
              </li>
            </ul>
          </div>
          <div class="hidden lg:col-span-2 lg:block">
            <div class="w-full">
              <div class="bg-blue-500 text-white relative flex items-center p-3">
                <img class="object-cover w-10 h-10 rounded-full"
                  src="https://cdn.pixabay.com/photo/2018/01/15/07/51/woman-3083383__340.jpg" alt="username" />
                <span class="block text-2xl ms-3 font-bold">Agustin</span>
                <span class="absolute w-3 h-3 bg-green-600 rounded-full left-10 top-3">
                </span>
              </div>
              <div class="relative w-full p-6 overflow-y-auto h-[40rem]">
                <ul class="space-y-2">
                  <li class="flex justify-start">
                    <div class="relative max-w-xl px-4 py-2 text-gray-700 rounded shadow">
                      <span class="block">Hola</span>
                    </div>
                  </li>
                  <li class="flex justify-end">
                    <div class="relative max-w-xl px-4 py-2 text-gray-700 bg-gray-100 rounded shadow">
                      <span class="block">Hola</span>
                    </div>
                  </li>
                  <li class="flex justify-end">
                    <div class="relative max-w-xl px-4 py-2 text-gray-700 bg-gray-100 rounded shadow">
                      <span class="block">Como estas?</span>
                    </div>
                  </li>
                </ul>
              </div>
              <div class="flex w-full p-3 border-t border-gray-300">
                <input type="text" placeholder="Mensaje"
                  class="w-full py-2 pl-4 me-3 bg-gray-100 outline-none focus:text-gray-700" />
                <Button label='Enviar' size='small' className="hover:!bg-blue-600"></Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}