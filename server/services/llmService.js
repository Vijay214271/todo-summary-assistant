import { CohereClient } from 'cohere-ai';

const cohere = new CohereClient({
    token : process.env.COHERE_API_KEY || jJ6kjbm8lbUArT0quxCqG69HzvSWf77mCNpDnI86
})
async function summarizeTodo(todos) {
    const plainText = todos.map(t=> `- ${t.text}`).join("\n");

    const response = await cohere.generate({
        model: 'command-r-plus',
        prompt: `Summarize the following TODO lists: \n${plainText}`,
        max_tokens: 100,
        temperature:0.5
    });
    console.log('Cohere response:', response);

    return response.generations[0].text.trim();
}

export default summarizeTodo;