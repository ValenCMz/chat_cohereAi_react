import { createContext, useContext, useState } from 'react';
import { nanoid } from 'nanoid';

// Crear un contexto con un valor predeterminado
const ChatsContext = createContext();

// Crear un proveedor de contexto
// eslint-disable-next-line react/prop-types
export const AppProvider = ({ children }) => {
    const [chats, setChats] = useState(new Map());
    const [activeChatId, setActiveChatId] = useState(null);
    
    const addChatToHistory = (chatName) => {
    const newChat = { id: nanoid(), name: chatName };
    setChats((prevChats) => {
        const updatedChats = new Map(Array.from(prevChats));
        updatedChats.set(newChat.id, newChat);
        return updatedChats;
    });
    return newChat.id;
    };

    const initChat = (chatName) => {
        if (chatName) {
          const newChatId = addChatToHistory(chatName);
          setActiveChatId(newChatId);
        }
    };

    const deleteChat = (chatId) => {
        setChats((prevChats) => {
          const updatedChats = new Map(Array.from(prevChats));
          updatedChats.delete(chatId);
          if (updatedChats.size > 0 && activeChatId === chatId) {
            let firstChat = updatedChats.keys().next().value;
            setActiveChatId(firstChat);
          } else {
            setActiveChatId(null);
          }
          return updatedChats;
        });
      };

      const selectChat = (chatId) => {
        showHistory();  
        setActiveChatId(chatId)
      };
    

      const showHistory = () => {
        const history = document.querySelector('.history');
        if(history){
          history.classList.toggle('show');
        }
      };

      const updateChats = (chats) => {
        setChats(chats);
      }

      return (
        <ChatsContext.Provider value={{ chats, activeChatId, initChat, deleteChat, selectChat, showHistory, updateChats }}>
          {children}
        </ChatsContext.Provider>
      );
};

// Crear un hook personalizado para usar el contexto
export const useAppContext = () => useContext(ChatsContext);
