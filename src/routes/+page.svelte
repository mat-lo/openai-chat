<script>
	import '../app.css';

	let prompt = '';
	let output = '';

	const generateChatCompletion = async () => {
		const response = await fetch('/api/chatCompletion', {
			method: 'POST',
			body: JSON.stringify({ prompt: prompt }),
			headers: {
				'content-type': 'application/json'
			}
		});

		const { result } = await response.json();

		// typing effect!
		let i = 0;
		let typingEffect = setInterval(() => {
			output += result[i];
			i++;
			if (i > result.length - 1) {
				clearInterval(typingEffect);
			}
		}, 20);
	};
</script>

<input type="text" bind:value={prompt} placeholder="input yo!" />
<button on:click={generateChatCompletion}>Calculate</button>
<p>{output}</p>
