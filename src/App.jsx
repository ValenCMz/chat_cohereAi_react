import './App.css'
import { useState, useEffect} from 'react';
import { nanoid } from 'nanoid';

import Chat from './components/Chat'


/*
  Idea del proyecto:
    1. Boton para Iniciar un chat ✅
    2. Chat con un input para escribir mensajes ✅
    2.1 Boton para enviar mensajes ✅
    2.2 Mostrar mensajes enviados ✅
    
    3. Panel para mostrar el historial de chats ✅
    3.1 Mostrar mensajes enviados ✅
    3.2 Mostrar mensajes recibidos ✅

    4. Cada boton del historial de chats este ligado a un chat
    4.1 Navegar por los distintos chats
    4.2 que persistas la informacion al intercambiar de chats y al cerrar la pagina web

*/



function App() {
  const [chats, setChats] = useState([]);
  const [activeChatId, setActiveChatId] = useState(null);
  const [buttonHistory, setButtonHistory] = useState(false)

  const addChatToHistory = (chatName) => {
    const newChat = {
      id: nanoid(),
      name: chatName,
    };
    setChats((prevChats) => [...prevChats, newChat]);
    return newChat.id;
  };

  //Cargar los chats desde localStorage cuando carga el componente
  useEffect(() => {
    const savedChats = localStorage.getItem('chats');
    if (savedChats) {
      setChats(JSON.parse(savedChats));
    }
  }, []);

  //Guardar los cambios en localstorage cuando cambie el estado
  useEffect(() => {
    localStorage.setItem('chats', JSON.stringify(chats));
  }, [chats]);

  const selectChat = (chatId) => {
    setActiveChatId(chatId)
  }

  const initChat = () => {
    const newChatId = addChatToHistory(`Chat ${chats.length + 1}`);
    setActiveChatId(newChatId)
    setButtonHistory(true)
  }

  useEffect(() => {
  }, [activeChatId]);

  return (
    <div className='flex h-screen'>
        <div className='history flex-1/4 w-1/4 border-r border-gray-500 '>
          {
            chats.map((chat) => {
              console.log(chat.id);
              return (
                <div key={chat.id}>
                  <button className='w-full hover:bg-sky-700' onClick={() => selectChat(chat.id)}>
                    {chat.name}
                  </button>
                </div>
              );
            })
          }

          {buttonHistory ?  
            <div className="button_history">
                <button className='text-sm bg-gray-700 p-2 rounded-md ' onClick={initChat}> 
                  Iniciar Chat 
                </button>
            </div> 
            : null
          }
         
        </div>

         
        <div className='w-full flex justify-center'>

        {!buttonHistory ? 
          <div className='flex items-center'>  
            <button className='text-sm bg-gray-700 p-2 rounded-md ' onClick={initChat}> 
              Iniciar Chat 
            </button>
          </div>
          : null
        }
        
        {activeChatId ? <Chat chatId={activeChatId}  /> : null}
          </div>
    </div>   
  )
}

export default App
