import './App.css'
import { useState, useEffect, useRef} from 'react';
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

    4. Cada boton del historial de chats este ligado a un chat✅
    4.1 Navegar por los distintos chats✅
    4.2 que persistas la informacion al intercambiar de chats y al cerrar la pagina web✅

    5.Que los chats se guarden cuando refresco la pagina
    5.1 Eliminar chats

    6.Acomodar el css

    7.Refactor de codigo

    8.Agregar docker y una base de datos para manejar los chats

*/



function App() {
  const inputRef = useRef(null);
  /*Voy a usar un map ya que me parece la mejor estructura para tratar esto, ya que gracias a la clave: valor nos permite una busqueda de elementos de complejidad constante */
  const [chats, setChats] = useState(new Map());
  const [activeChatId, setActiveChatId] = useState(null);
  const [buttonHistory, setButtonHistory] = useState(false)

  const addChatToHistory = (chatName) => {
    const newChat = {
      id: nanoid(),
      name: chatName,
    };
    setChats((prevChats) => {
      const updatedChats = new Map(Array.from(prevChats));
      updatedChats.set(newChat.id, newChat);
      return updatedChats;
    });
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
    const chatName = inputRef.current.value;
    if(chatName){
      const newChatId = addChatToHistory(chatName);
      setActiveChatId(newChatId)
      setButtonHistory(true)
    }

  }

  useEffect(() => {
  }, [activeChatId]);

  return (
    <div className='flex h-screen'>
        <div className='history flex-1/4 w-1/4 border-r border-gray-500 '>
          {
            Array.from(chats).map(([key, chat]) => {
              return (
                <div key={key}>
                  <button className='w-full hover:bg-sky-700' onClick={() => selectChat(key)}>
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
                <input type="text" 
                  placeholder='Nombre del chat' 
                  className='text-neutral-950 rounded'
                  ref={inputRef}
                />
            </div> 
            : null
          }
         
        </div>

         
        <div className='w-full flex justify-center'>

        {!buttonHistory ? 
          <div className='flex flex-col items-center justify-center gap-2'>  
            <button className='text-sm bg-gray-700 p-2 rounded-md ' onClick={initChat}> 
              Iniciar Chat 
            </button>
            <input type="text" 
            placeholder='Nombre del chat' 
            className='text-neutral-950 rounded'
            ref={inputRef}
            />
          </div>
          : null
        }
        {activeChatId ? <Chat chatId={activeChatId} chatName={activeChatId?chats.get(activeChatId).name:null} /> : null}
          </div>
    </div>   
  )
}

export default App
