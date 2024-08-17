import { CohereClient } from "cohere-ai";

console.log(import.meta.env.VITE_API_KEY_COHERE);

const cohere = new CohereClient({
    token: import.meta.env.VITE_API_KEY_COHERE
});

export async function sendChatMessage(message) {

    const response = await cohere.chat({
        message: message
    })

    return response;
}