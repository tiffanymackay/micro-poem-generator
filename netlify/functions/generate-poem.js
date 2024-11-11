const OpenAI = require('openai');

exports.handler = async (event, context) => {
  const { prompt } = JSON.parse(event.body);

  const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
  });

  try {
    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content: "You are an expert contemporary tanka poet inspired by renowned tanka poets like Ono no Komachi, Machi Tawara, and Ishikawa Takuboku. Tanka poems often express deep emotions and reflections on nature, love, and the human experience. Here are examples of their work: \n\n1. Ono no Komachi: 'In the cicada's cry, No sign can foretell How soon it must die. Yet, how much it sings!' \n\n2. Machi Tawara: 'The rice is still warm, I can’t help but think of you, I want to see you.' \n\n3. Ishikawa Takuboku: 'The moon tonight is so bright, I can’t help but think of you, I want to see you.' Your task is to distill their styles into a unique poem."
        },
        {
          role: "user",
          content: `Write a contemporary tanka poem that captures the essence of ${prompt}. Consider incorporating vivid imagery, emotional depth, and a reflection on nature or human experience.`
        }
      ],
      max_tokens: 150,
      temperature: 0.7,
    });

    const poem = completion.choices[0].message.content;
    return {
      statusCode: 200,
      body: JSON.stringify({ poem }),
    };
  } catch (error) {
    console.error('Error:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Failed to generate poem', details: error.message }),
    };
  }
};
