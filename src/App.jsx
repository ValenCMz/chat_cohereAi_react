import './App.css';
import { useEffect, useRef } from 'react';
import Chat from './components/Chat';
import { useAppContext } from './context/ChatsContext.jsx';
import History from './components/History';
import FormNewChat from './components/FormNewChat';

function App() {
  const inputRef = useRef(null);
  const { chats, activeChatId, showHistory, updateChats } = useAppContext();

  useEffect(() => {
    if (chats.size === 0) {
      const savedChats = sessionStorage.getItem('chats');
      if (savedChats) {
        updateChats(new Map(JSON.parse(savedChats)));
      }
    }
  }, []);

  useEffect(() => {
    sessionStorage.setItem('chats', JSON.stringify(Array.from(chats.entries())));
  }, [chats]);

  const getName = (activeChatId = null) => {
    const chats = sessionStorage.getItem('chats');
    if (chats) {
      const chatsArray = JSON.parse(chats);
      for (const [key, value] of chatsArray) {
        if (activeChatId != null && key === activeChatId) {
          return value.name;
        }
      }
      return 'Selecciona un chat';
    }
    return 'Selecciona un chat';
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
      
      {chats.size > 0 ? <History /> : null}

      <div className="w-full flex justify-center">
        {chats.size === 0 ? (
          <div className="flex flex-col space-y-80 items-center">
            <h1 className="mt-6 text-xl">Bienvenido a cohere bot</h1>
            <FormNewChat inputRef={inputRef} textButton="Empezar a chatear con cohere"/>
          </div>
        ) : null}
        {chats.size > 0? (
          <Chat 
            activeChatId={activeChatId}
            chatId={activeChatId}
            chatName={activeChatId && chats.size > 0 ? chats.get(activeChatId).name : getName(activeChatId)}
          />
        ) : null }
      </div>
    </div>
  );
}

export default App;