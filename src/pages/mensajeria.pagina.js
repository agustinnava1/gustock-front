import { Search, UserCircle2 } from "lucide-react"
import { useEffect, useState } from "react"
import { Tag } from 'primereact/tag';

//import Stomp from 'stompjs'
import SockJS from "sockjs-client"

export const MensajeriaPagina = () => {
  const [userData, setUserData] = useState({
    message: "",
    username: "",
    receiverName: ""
  })

  const [messages, setMessages] = useState([])

  /*useEffect(() => {
    const socket = new SockJS('http://localhost:8080/ws')
    const client = Stomp.over(socket)

    client.connect({}, () => {
      client.subscribe('/user/' + 'pepito' + '/private', onPrivateMessageReceived)
    })
  }, [])*/

  return (
    <div class="flex overflow-hidden">

      <div class="w-1/4 bg-white border-r border-gray-300">
        <div class="p-4 border-b border-gray-300 flex justify-between items-center bg-blue-500">
          <h2 class="text-2xl font-semibold !text-white">Conversaciones</h2>
        </div>

        <div class="overflow-y-auto p-3 mb-9 pb-20">
          <div class="flex items-center mb-4 cursor-pointer hover:bg-gray-100 p-2 rounded-md">
            <div class="w-12 h-12 bg-gray-400 rounded-full mr-3">
              <UserCircle2 class="w-12 h-12 rounded-full text-white" />
            </div>
            <div class="flex-1">
              <h2 class="text-lg font-semibold">Sujeto 1</h2>
              <p class="text-gray-600">Mensaje de prueba</p>
            </div>
          </div>
        </div>
      </div>

      <div class="flex-1 relative">
        <div class="bg-white text-gray-700 flex justify-between items-center p-4">
          <h2 class="text-2xl font-semibold">Sujeto 1</h2>
          <Tag severity="success" value="En línea"></Tag>
        </div>

        <div class="overflow-y-auto h-[820px] p-4 pb-36">
          <div class="flex mb-4">
            <div class="w-9 h-9 rounded-full flex items-center justify-center mr-2 bg-gray-400">
              <UserCircle2 class="w-8 h-8 rounded-full text-white" />
            </div>
            <div className="text-start">
              <p class="bg-white rounded-md p-3">Mensaje de prueba</p>
              <span className="text-sm">10/06/07 15:24</span>
            </div>
          </div>

          <div class="flex justify-end mb-4">
            <div className="text-end">
              <p class="bg-blue-500 text-white rounded-md p-3">Mensaje de prueba</p>
              <span className="text-sm">10/06/07 15:24</span>
            </div>
            <div class="w-9 h-9 rounded-full flex items-center justify-center ml-2 bg-blue-500">
              <UserCircle2 class="w-8 h-8 rounded-full text-white" />
            </div>
          </div>
        </div>

        <div class="bg-white border-t border-gray-300 p-4 absolute bottom-0 w-full">
          <div class="flex items-center gap-3">
            <Search className="bg-blue-500 text-white rounded-md p-2 hover:cursor-pointer" size={40} />
            <input type="text" placeholder="Escribe un mensaje..." class="w-full p-2 rounded-md border border-gray-400 focus:outline-none focus:border-blue-500"></input>
            <button class="bg-blue-500 font-medium text-white px-4 py-2 rounded-md">Enviar</button>
          </div>
        </div>
      </div>
    </div>
  )
}