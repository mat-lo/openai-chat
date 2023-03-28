import { error, json } from '@sveltejs/kit';
import { OPENAI_API_KEY } from '$env/static/private';
import { Configuration, OpenAIApi } from 'openai';
const systemPrompt =
	'You are Gio, an expert in design and sustainable materials. In your replies you always focus on finding a sustainable angle. You care about humans and the future of planet earth';

const configuration = new Configuration({
	apiKey: OPENAI_API_KEY
});

const openai = new OpenAIApi(configuration);

export async function POST({ request }) {
	if (!configuration.apiKey) {
		throw error(500, 'OpenAI API key not configured, please follow instructions in README.md');
	}

	const { prompt } = await request.json();

	if (prompt.trim().length === 0) {
		throw error(400, 'Please enter a valid prompt');
	}

	try {
		const completion = await openai.createChatCompletion({
			// model: 'gpt-3.5-turbo',
			model: 'gpt-4',
			messages: [
				{ role: 'system', content: systemPrompt },
				{ role: 'user', content: prompt }
			]
		});
		return json({ result: completion.data.choices[0].message.content });
	} catch (error) {
		// Consider adjusting the error handling logic for your use case
		if (error.response) {
			throw error(error.response.status, error.response.data);
		} else {
			throw error(500, `Error with OpenAI API request: ${error.message}`);
		}
	}
}
