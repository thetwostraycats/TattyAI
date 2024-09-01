async function generateTattoo() {
    const resultDiv = document.getElementById('tattoo-result');
    const prompt = document.getElementById('prompt').value;
    resultDiv.innerHTML = "Generating tattoo...";

    const apiKey = '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'; // Replace with your Hugging Face API key
    const apiUrl = 'https://api-inference.huggingface.co/models/CompVis/stable-diffusion-v1-4';

    try {
        const response = await fetch(apiUrl, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${apiKey}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                inputs: prompt
            })
        });

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const output = await response.blob(); // Get image blob
        const imageUrl = URL.createObjectURL(output);

        // Display the generated image
        resultDiv.innerHTML = `<img src="${imageUrl}" alt="Generated Tattoo" style="max-width: 100%; height: auto;">`;

    } catch (error) {
        resultDiv.innerHTML = `Error generating tattoo: ${error.message}`;
    }
}
