import './App.css';
import { useState, useEffect, useRef } from 'react';
import { nanoid } from 'nanoid';
import Chat from './components/Chat';

function App() {
  const inputRef = useRef(null);
  const [chats, setChats] = useState(new Map());
  const [activeChatId, setActiveChatId] = useState(null);
  const [buttonHistory, setButtonHistory] = useState(false);
  const [isFirstLoad, setIsFirstLoad] = useState(false);

  const addChatToHistory = (chatName) => {
    const newChat = { id: nanoid(), name: chatName };
    setChats((prevChats) => {
      const updatedChats = new Map(Array.from(prevChats));
      updatedChats.set(newChat.id, newChat);
      return updatedChats;
    });
    return newChat.id;
  };

  useEffect(() => {
    const hasVisitedBefore = sessionStorage.getItem('hasVisitedBefore');
    if (!hasVisitedBefore) {
      sessionStorage.setItem('hasVisitedBefore', 'true');
      setIsFirstLoad(true);
    } else {
      setIsFirstLoad(false);
      const savedChats = sessionStorage.getItem('chats');
      if (savedChats) {
        setChats(new Map(JSON.parse(savedChats)));
      }
    }
  }, []);

  useEffect(() => {
    sessionStorage.setItem('chats', JSON.stringify(Array.from(chats.entries())));
  }, [chats]);

  const selectChat = (chatId) => setActiveChatId(chatId);

  const initChat = (event) => {
    event.preventDefault();
    const chatName = inputRef.current.value;
    if (chatName) {
      const newChatId = addChatToHistory(chatName);
      setActiveChatId(newChatId);
      setButtonHistory(true);
      setIsFirstLoad(false);
      inputRef.current.value = '';
    }
  };

  const deleteChat = (chatId) => {
    setChats((prevChats) => {
      const updatedChats = new Map(Array.from(prevChats));
      updatedChats.delete(chatId);
      return updatedChats;
    });
  };

  const getName = (activeChatId) => {
    const chats = sessionStorage.getItem('chats');
    if (chats) {
      const chatsArray = JSON.parse(chats);
      for (const [key, value] of chatsArray) {
        if (activeChatId != null && key === activeChatId) {
          return value.name;
        }
      }
    }
    return 'Selecciona un chat';
  };

  const showHistory = () => {
    const history = document.querySelector('.history');
    history.classList.toggle('show');
  };

  return (
    <div className="flex h-full">
      {chats.size > 0 ? 
        <div className="btn-showHistory cursor-pointer fixed m-5 bg-black rounded-full p-1" onClick={() => showHistory()}>
          <svg xmlns="http://www.w3.org/2000/svg" width="2em" height="2em" viewBox="0 0 32 32">
            <path fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8h15M5 16h22M5 24h22M5 11l3-3l-3-3"/>
          </svg>
        </div>
      : null}
      <div className="history border-r border-gray-500 flex flex-col h-full">
        <div className="cursor-pointer m-5 absolute transform scale-x-[-1]" onClick={() => showHistory()}>
          <svg xmlns="http://www.w3.org/2000/svg" width="2em" height="2em" viewBox="0 0 32 32">
            <path fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8h15M5 16h22M5 24h22M5 11l3-3l-3-3"/>
          </svg>
        </div>

        {isFirstLoad == false && (
          <div className="overflow-y-auto flex-1 mt-16 text-center">
            <h1>Selecciona un chat</h1>
            {Array.from(chats).map(([key, chat]) => (
              <div key={key} className="text-lg border m-4">
                <button className="hover:bg-sky-700 w-1/2" onClick={() => selectChat(key)}>
                  {chat.name}
                </button>
                <button className="hover:bg-red-700 w-1/2" onClick={() => deleteChat(key)}>
                  Eliminar chat
                </button>
              </div>
            ))}
          </div>
        )}

        {isFirstLoad == false && chats.size > 0 && (
          <div className="button_history p-4 border-t border-gray-500">
            <form action="" className="flex flex-col gap-2">
              <label htmlFor="">Introduce el nombre del chat</label>
              <input
                type="text"
                placeholder="Nombre del chat"
                className="text-neutral-950 rounded text-center"
                ref={inputRef}
                required
              />
              <button className="text-sm bg-gray-700 p-2 rounded-md  " onClick={initChat}>
                Iniciar un nuevo chat con cohere
              </button>
            </form>
          </div>
        )}
      </div>

      <div className="w-full flex justify-center">
        {(isFirstLoad && !buttonHistory) || chats.size === 0 ? (
          <div className="flex flex-col space-y-80 items-center">
            <h1 className="mt-6 text-xl">Bienvenido a cohere bot</h1>
            <form action="" className="flex flex-col gap-2">
              <label htmlFor="">Introduce el nombre del chat</label>
              <input
                type="text"
                placeholder="Nombre del chat"
                className="text-neutral-950 rounded text-center"
                ref={inputRef}
                required
              />
              <button className="text-sm bg-gray-700 p-2 rounded-md" onClick={initChat}>
                Empezar a chatear con cohere
              </button>
            </form>
          </div>
        ) : null}

        {(activeChatId || !isFirstLoad) && chats.size > 0 && (
          <Chat
            chatId={activeChatId}
            chatName={activeChatId && chats.size > 0 ? chats.get(activeChatId).name : getName(activeChatId)}
          />
        )}
      </div>
    </div>
  );
}

export default App;
