import { useAppContext } from '../context/ChatsContext.jsx';
import { useRef } from 'react';
import FormNewChat from './FormNewChat.jsx';

function History () {
    const inputRef = useRef(null);
    const {chats, deleteChat, selectChat, showHistory} = useAppContext();

    return (

      <div className="history border-r border-gray-500 flex flex-col h-full">
        <div className="cursor-pointer m-5 absolute transform scale-x-[-1]" onClick={() => showHistory()}>
          <svg xmlns="http://www.w3.org/2000/svg" width="2em" height="2em" viewBox="0 0 32 32">
            <path fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8h15M5 16h22M5 24h22M5 11l3-3l-3-3"/>
          </svg>
        </div>
        {chats.size > 0 && (
          <div className="overflow-y-auto flex-1 mt-16 text-center">
            <h1>Selecciona un chat</h1>
            {Array.from(chats).map(([key, chat]) => (
              <div key={key} className="text-lg border m-4">
                <button className="hover:bg-sky-700 w-1/2 border-r" onClick={() => selectChat(key)}>
                  {chat.name}
                </button>
                <button className="hover:bg-red-700 w-1/2" onClick={() => deleteChat(key)}>
                  Eliminar chat
                </button>
              </div>
            ))}
          </div>
        )}

        {chats.size > 0 && (
          <div className="button_history p-4 border-t border-gray-500">
            <FormNewChat inputRef={inputRef} textButton="Iniciar un nuevo chat con cohere"/>
          </div>
        )}
      </div> 
    )
}

export default History;