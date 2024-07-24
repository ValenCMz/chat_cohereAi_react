import './App.css'
import { useState } from 'react';

import Chat from './components/Chat'

/*
  Idea del proyecto:
    1. Boton para Iniciar un chat
    2. Chat con un input para escribir mensajes
    2.1 Boton para enviar mensajes
    2.2 Mostrar mensajes enviados
    
    3. Panel para mostrar el historial de chats
    3.1 Mostrar mensajes enviados
    3.2 Mostrar mensajes recibidos

*/



function App() {
  const [isChatActive, setIsChatActive] = useState(false); // Use the useState hook to create a state variable

  const showChat = () => {
    setIsChatActive(!isChatActive); // Toggle the value of isChatActive
  }

  return (
    <>
    <div className='flex h-screen'>
        <div className='history flex-1/4 w-1/4 border-r border-gray-500'>
          <ul>
            <li>asdasdas</li>
            <li>adsadasdda</li>
            <li>adadada</li>
            <li>asdasdasda</li>
            <li>asdasddsadas</li>
          </ul>
        </div>

        <div className='w-full flex justify-center'>
          <div className='flex items-center'>
            {!isChatActive ? (    
            <button className='text-sm bg-gray-700 p-2 rounded-md ' onClick={showChat}> 
              Iniciar Chat 
            </button>): null
            }
          </div>
       
      
          {/* Renderizado del chat, por ahora dejo en null si no esta disponible */}
          {isChatActive ? <Chat /> : null}
        </div>
    </div>
      
      
    </>    
  )
}

export default App
