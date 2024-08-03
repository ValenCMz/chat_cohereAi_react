import { useState, useEffect } from "react";
import { useMessages } from "../hooks/useMessages";
import IconBotChat from "./IconBotChat";
import IconUserChat from "./IconUserChat";

// eslint-disable-next-line react/prop-types
function Chat({chatId, chatName}) {
    const [valueInput, setValueInput] = useState('');
    const {messages, getRta} = useMessages(valueInput)
    const [messagesArray, setMessagesArray] = useState([])

    //Carga los mensajes al sessionStorage se crea el componente
    useEffect(() => {
        const savedMessages = sessionStorage.getItem(`chat_${chatId}_messages`);
        if (savedMessages) {
          setMessagesArray(JSON.parse(savedMessages));
        } else {
          setMessagesArray([]);
        }
      }, [chatId]);

    //Actualiza el sessionStorage
    useEffect(() => {
        sessionStorage.setItem(`chat_${chatId}_messages`, JSON.stringify(messagesArray));
    }, [messagesArray, chatId]);

    useEffect(() => {
        if (messages) {
            setMessagesArray(prevMenssages => [...prevMenssages, {text: messages, isUser: false}]);
        }
    }, [messages]);

    const handleChange = (event) => {
        event.preventDefault();
        setValueInput(event.target.value);
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        if(valueInput === '') return;
        setMessagesArray(prevMenssages => [...prevMenssages, {text: valueInput, isUser: true}]);
        getRta(valueInput)
        setValueInput('');
    }

    return (
        <div className="w-full h-screen flex flex-col">
            {chatName ? <div className="text-center mt-2"><h1>{chatName}</h1></div> : null}
            <div className="flex-1 overflow-y-auto p-4 ">
                {messagesArray.map((message, index) => (
                    <div 
                        key={index} 
                        className={`flex mb-2 p-2  border-b border-gray-500 ${message.isUser ? 'justify-end ' : 'self-start'}`}
                    >
                        {!message.isUser ? (
                            <>
                            <IconBotChat />
                            <span className="ml-2">{message.text}</span>
                            </>
                        ) : (
                            <>
                            <span className="mr-2">{message.text}</span>
                            <IconUserChat />
                            </>
                        )}                        
                    </div>
                ))}
            </div>
            <form className="flex p-4 border-t border-gray-200" onSubmit={handleSubmit}>
                <input
                    value={valueInput}
                    onChange={handleChange}
                    type="text"
                    placeholder="Mensaje a cohere"
                    className="text-gray-900 w-full p-2 border border-gray-300 rounded-l"
                />
                <button
                    type="submit"
                    className="bg-blue-500 text-white px-4 py-2 rounded-r"
                >
                    Enviar
                </button>
            </form>
        </div>
    );
}

export default Chat;