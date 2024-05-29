import { CohereClient } from "cohere-ai";


const cohere = new CohereClient({
    token: import.meta.env.VITE_API_KEY_COHERE
});

export async function sendChatMessage(message) {
    console.log("sendChatMessage", message)

    const response = await cohere.chat({
        message: message
    })

    return response;
}