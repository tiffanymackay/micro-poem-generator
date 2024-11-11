import React, { useState } from 'react';

function PoemGenerator() {
  const [prompt, setPrompt] = useState('');
  const [poem, setPoem] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('Form submitted');
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(process.env.NODE_ENV === 'development' 
        ? 'http://localhost:3000/api/generate-poem' 
        : 'https://micropoetry.netlify.app/.netlify/functions/generate-poem', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ prompt })
      });

      const data = await response.json();
      console.log('Response data:', data);
      if (!response.ok) {
        throw new Error(data.details || 'Failed to generate poem');
      }
      setPoem(data.poem);
    } catch (error) {
      setError(error.message || 'Sorry, there was an error generating your poem.');
      console.error('Error details:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main>
      <form onSubmit={handleSubmit}>
        <textarea
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="Enter a topic or theme for your poem"
        />
        <button type="submit" disabled={loading}>
          {loading ? 'Generating...' : 'Generate Poem'}
        </button>
      </form>
      {error && <div className="poem-display error">{error}</div>}
      {poem && <div className="poem-display">{poem}</div>}
    </main>
  );
}

export default PoemGenerator; 