<script>
	import '../app.css';

	let prompt = 'Type your query here';
	let output = '';
	let textColor = '#999';

	// output =
	// 	"As the AI creative director, I would say that our company's mission is to use advanced technology and innovative thinking to create impactful and meaningful experiences that enrich people's lives. We strive to push the boundaries of what is possible, inspire creativity and imagination, and make a positive impact on the world through our products and services.";

	const clearInput = () => {
		prompt = '';
		textColor = '#000';
	};

	const generateChatCompletion = async () => {
		output = 'Thinking...';
		const response = await fetch('/api/chatCompletion', {
			method: 'POST',
			body: JSON.stringify({ prompt: prompt }),
			headers: {
				'content-type': 'application/json'
			}
		});
		const { result } = await response.json();
		output = '';
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

<svelte:head>
	<title>Ask Goby</title>
</svelte:head>

<main class="mx-auto w-[95%] md:w-96  flex flex-col pt-9">
	<div class="text-center pb-4">
		<h1 class="font-bold text-3xl">Goby</h1>
		<p class="text-sm opacity-50">Roby + GPT-3.5</p>
	</div>
	<form class="flex flex-col mx-auto w-full">
		<div
			contenteditable="true"
			style="color: {textColor};"
			on:click|once={clearInput}
			bind:innerHTML={prompt}
			class="border-[1px] border-black mb-4 p-3 rounded-md"
			type="text"
		/>
		<button
			class="bg-slate-300 rounded-full w-[fit-content] mx-auto px-4 py-1 hover:bg-slate-200"
			on:click={generateChatCompletion}>Ask Goby</button
		>
	</form>
	<p class=" text-slate-500 mt-12">{output}</p>
</main>
