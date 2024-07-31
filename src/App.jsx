import './App.css'
import { useState, useEffect, useRef} from 'react';
import { nanoid } from 'nanoid';

import Chat from './components/Chat'

function App() {
  const inputRef = useRef(null);
  /*Voy a usar un map ya que me parece la mejor estructura para tratar esto, ya que gracias a la clave: valor nos permite una busqueda de elementos de complejidad constante */
  const [chats, setChats] = useState(new Map());
  const [activeChatId, setActiveChatId] = useState(null);
  const [buttonHistory, setButtonHistory] = useState(false)

  //Cuando se crea la variable esta es falsa
  const [isFirstLoad, setIsFirstLoad] = useState(false);

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

  //Cargar los chats desde sessionStorage cuando carga el componente
  useEffect(() => {
    const hasVisitedBefore = sessionStorage.getItem('hasVisitedBefore');
    if (!hasVisitedBefore) {
      sessionStorage.setItem('hasVisitedBefore', 'true');
      // Si es la primera vez que se carga la pagina se setea el estado de isFirstLoad en true
      setIsFirstLoad(true);
    } else {
      // Si no es la primera carga se setea el estado de isFirstLoad en false
      setIsFirstLoad(false);

      const savedChats = sessionStorage.getItem('chats');
      if (savedChats) {
        setChats(new Map(JSON.parse(savedChats)));
      }
    }
  }, []);

  //Guardar los cambios en sessionStorage cuando cambie el estado
  useEffect(() => {
    sessionStorage.setItem('chats', JSON.stringify(Array.from(chats.entries())));
  }, [chats]);

  const selectChat = (chatId) => {
    setActiveChatId(chatId)
  }

  const initChat = () => {
    const chatName = inputRef.current.value;
    if(chatName){
      const newChatId = addChatToHistory(chatName);
      setActiveChatId(newChatId);
      setButtonHistory(true);
      setIsFirstLoad(false);
      inputRef.current.value = '';
    }
  }

  const deleteChat = (chatId) => {
    setChats((prevChats) => {
      const updatedChats = new Map(Array.from(prevChats));
      updatedChats.delete(chatId);
      return updatedChats;
    });
  }

  const getName = (activeChatId) => {
    const chats = sessionStorage.getItem('chats');
    if (chats) {
      // Parsear el JSON guardado en sessionStorage
      const chatsArray = JSON.parse(chats);
      // Buscar el chat con el ID proporcionado
      for (const [key, value] of chatsArray) {
        if (activeChatId != null && key === activeChatId) {
          console.log("ENTROOO")
          return value.name;
        }
      }
      return 'Selecciona un chat';
    }
    return 'Selecciona un chat';
  };
  
  return (
    <div className='flex h-screen'>
        <div className='history border-r border-gray-500 '>
          {isFirstLoad == false ?
            Array.from(chats).map(([key, chat]) => {
              return (
                <div key={key} className='flex'>
                  <button className='w-1/2 hover:bg-sky-700' onClick={() => selectChat(key)}>
                    {chat.name}
                  </button>
                  <button className='w-1/2 hover:bg-red-700' onClick={() => deleteChat(key)}>
                    Eliminar chat
                  </button>
                </div>
              );
            })
            :null
          }

          {isFirstLoad == false ?  
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
        
          {/* Si no esta el boton del historial y es la primer carga */}
          {isFirstLoad && !buttonHistory? 
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

          {activeChatId || !isFirstLoad ? 
          <Chat chatId={activeChatId} 
                chatName={activeChatId && chats.size > 0 ?
                chats.get(activeChatId).name 
                : getName(activeChatId)
                }
          /> 
          : null
          }
        </div>
    </div>   
  )
}

export default App
