import { useCallback, useRef, useState } from "react"
import { sendChatMessage } from "../services/chat"

export function useMessages() {
    const [messages, setMessages] = useState();
    const previousMessage = useRef()

    const getRta = useCallback(async (message) => {

        if(previousMessage.current === message) return;

        const response = await sendChatMessage(message);
        let rta  = response.text;
        setMessages(rta);

        previousMessage.current = message;
    }, [])

    return {
        messages,
        getRta
    }
}