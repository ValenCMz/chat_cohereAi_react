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
      <button className='text-sm bg-gray-700 p-2 rounded-md' onClick={showChat}> 
        Iniciar Chat 
      </button>
      {/* Renderizado del chat, por ahora dejo en null si no esta disponible */}
      {isChatActive ? <Chat /> : null}
    </>    
  )
}

export default App
