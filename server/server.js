import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import OpenAI from 'openai';
import rateLimit from 'express-rate-limit';
import path from 'path';

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100 // limit each IP to 100 requests per windowMs
});

app.use('/api/', limiter);

// Initialize OpenAI
const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY
});

// Poem generation endpoint
app.post('/api/generate-poem', async (req, res) => {
    try {
        const { prompt } = req.body;
        
        const completion = await openai.chat.completions.create({
            model: "gpt-3.5-turbo",
            messages: [
                {
                    role: "system",
                    content: "You are an expert contemporary tanka poet inspired by famous tanka poets like Ono no Komachi, Machi Tawara, and Ishikawa Takuboku. Distill their styles into the poem you write."
                },
                {
                    role: "user",
                    content: `Write a contemporary tanka poem about: ${prompt}`
                }
            ],
            max_tokens: 150,
            temperature: 0.7,
        });

        const poem = completion.choices[0].message.content;
        res.json({ poem });
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: 'Failed to generate poem', details: error.message });
    }
});

// Serve static files from the build directory
app.use(express.static('build'));

// Serve the index.html file for the root route
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
}); 