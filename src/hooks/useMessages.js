import { useCallback, useRef, useState } from "react"
import { sendChatMessage } from "../services/chat"

export function useMessages() {
    const [messages, setMessages] = useState();
    const previousMessage = useRef()

    const getRta = useCallback(async (message) => {
        console.log('useMessage', message)

        if(previousMessage.current === message) return;

        const response = await sendChatMessage(message);
        console.log('responseUseMenssage', response)
        let rta  = response.text;
        console.log('rta', rta)
        setMessages(rta);

        previousMessage.current = message;
    }, [])

    return {
        messages,
        getRta
    }
}