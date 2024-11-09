// Load environment variables
require('dotenv').config();

// Access the API key safely
const apiKey = process.env.OPENAI_API_KEY;

document.querySelector('form').addEventListener('submit', async (e) => {
    e.preventDefault();
    const prompt = document.getElementById('poem-input').value;
    
    // Create poem display div if it doesn't exist
    let poemDisplay = document.querySelector('.poem-display');
    if (!poemDisplay) {
        poemDisplay = document.createElement('div');
        poemDisplay.className = 'poem-display';
        document.querySelector('main').appendChild(poemDisplay);
    }
    
    try {
        poemDisplay.textContent = 'Generating poem...';
        
        const response = await fetch('http://localhost:3000/api/generate-poem', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ prompt })
        });

        if (!response.ok) {
            throw new Error('Failed to generate poem');
        }

        const data = await response.json();
        poemDisplay.textContent = data.poem;
    } catch (error) {
        console.error('Error:', error);
        poemDisplay.textContent = 'Sorry, there was an error generating your poem.';
    }
});
