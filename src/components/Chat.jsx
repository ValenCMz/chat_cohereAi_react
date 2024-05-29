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
        <div>
            {/* Tengo un problema, los mensajes se estan actualizando cada vez que cambian, la idea es que vaya quedando cierto historial */}
            <div>
                {messagesArray.map((message, index) => {
                    return <p key={index}>{message.isUser? 'User: ': 'Bot: '}{message.text}</p>
                })}
            </div>
            <form>
                <input value={valueInput} onChange={handleChange} type="text" placeholder="Mensaje a cohere" className="text-zinc-950" />
            </form>
                <button onClick={click}>Enviar</button>
        </div>
    )
}

export default Chat;