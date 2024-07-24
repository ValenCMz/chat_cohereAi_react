import { useState, useEffect } from "react";
import { useMessages } from "../hooks/useMessages";

function Chat() {
    const [valueInput, setValueInput] = useState('');
    const {messages, getRta} = useMessages(valueInput)
    const [messagesArray, setMessagesArray] = useState([])

    useEffect(() => {
        if (messages) {
            setMessagesArray(prevMenssages => [...prevMenssages, {text: messages, isUser: false}]);
        }
    }, [messages]);

    const handleChange = (event) => {
        event.preventDefault();
        setValueInput(event.target.value);
    }

    const click = (event) => {
        event.preventDefault();
        if(valueInput === '') return;
        setMessagesArray(prevMenssages => [...prevMenssages, {text: valueInput, isUser: true}]);
        getRta(valueInput)
        setValueInput('');
    }

    return (
        <div className="w-full h-screen flex flex-col">
            <div className="flex-1 overflow-y-auto p-4 ">
                {messagesArray.map((message, index) => (
                    <div 
                        key={index} 
                        className={`flex mb-2 p-2  border-b border-gray-500 ${message.isUser ? 'justify-end ' : 'self-start'}`}
                    >
                        {message.text}
                    </div>
                ))}
            </div>
            <form className="flex p-4 border-t border-gray-200" onSubmit={click}>
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