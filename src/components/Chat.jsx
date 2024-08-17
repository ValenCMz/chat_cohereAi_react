import { useState, useEffect } from "react";
import { useMessages } from "../hooks/useMessages";
import IconUserChat from "./IconUserChat";
import FormChat from "./FormChat";
import { useAppContext } from "../context/ChatsContext";
import { CircleLoader } from "react-spinners";

// eslint-disable-next-line react/prop-types
function Chat({chatId, chatName, activeChatId}) {
    const [valueInput, setValueInput] = useState('');
    const {messages, getRta} = useMessages(valueInput)
    const [messagesArray, setMessagesArray] = useState([])
    const {showHistory} = useAppContext();
    const [loading, setLoading] = useState(false);

    //Carga los mensajes al sessionStorage se crea el componente
    useEffect(() => {
        const savedMessages = sessionStorage.getItem(`chat_${chatId}_messages`);
        if (savedMessages) {
          setMessagesArray(JSON.parse(savedMessages));
        } else {
          setMessagesArray([]);
        }
      }, [chatId]);

    useEffect(() => {
        sessionStorage.setItem(`chat_${chatId}_messages`, JSON.stringify(messagesArray));
    }, [messagesArray, chatId]);

    useEffect(() => {
        if (messages) {
            setMessagesArray(prevMenssages => [...prevMenssages, {text: messages, isUser: false}]);
            setLoading(false);
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
        setLoading(true);
        getRta(valueInput)
        setValueInput('');
    }

    return (
        <div className="w-full h-dvh flex flex-col">
            {chatName ? <div className="text-center mt-2"><h1>{chatName}</h1></div> : null}
            <div className="flex-1 overflow-y-auto p-4 ">
                {messagesArray.map((message, index) => (
                    <div 
                        key={index} 
                        className={`flex mb-2 p-2  border-b border-gray-500 ${message.isUser ? 'justify-end ' : 'self-start'}`}
                    >
                        {!message.isUser ? (
                            <>
                            <IconUserChat width="1.5em" height="1.5em" isUser={false}/>
                            <span className="ml-2">{message.text}</span>
                            </>
                        ) : (
                            <>
                            <span className="mr-2">{message.text}</span>
                            <IconUserChat width="1.5em" height="1.5em" isUser={true}/>
                            </>
                        )}                        
                    </div>
                ))}

                {loading && (
                    <div className="flex justify-center my-4">
                        <CircleLoader loading={loading} size={50} color={"#0299d0"}/>
                    </div>
                )}
            </div>
            {activeChatId != null ?
                <FormChat handleChange={handleChange} handleSubmit={handleSubmit} valueInput={valueInput} />
                : showHistory()
            }
         
        </div>
    );
}

export default Chat;