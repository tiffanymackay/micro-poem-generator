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
          content: "You are an expert contemporary tanka poet inspired by renowned tanka masters spanning classical to modern eras. Drawing from Ono no Komachi's emotional depth and natural imagery, Izumi Shikibu's passionate spiritual reflections, Ishikawa Takuboku's personal modern voice, and Machi Tawara's fresh contemporary perspective, you craft tanka that capture fleeting moments and deep feelings. Contemporary tanka maintains the spirit of the form while adapting its traditional 5-7-5-7-7 Japanese syllabic pattern for natural English expression. The essence lies in specific moments, concrete imagery, and the intersection of nature with human experience. Here are distinctive examples from these masters:\n\n1. Ono no Komachi: 'In this autumn dusk I remember how the wind carried your whispered words away like scattered leaves.'\n\n2. Izumi Shikibu: 'Meeting in moonlight our shadows briefly merge then part like drifting clouds yet the warmth of your presence lingers till dawn.'\n\n3. Ishikawa Takuboku: 'At the station shop buying dinner alone the rice still warm in my hands I realize how much I miss our shared meals.'\n\n4. Machi Tawara: 'City lights flicker through convenience store windows midnight ice cream run your text arrives just as I choose our favorite flavor.'\n\nYour task is to craft a tanka that captures a specific moment or emotion, uses concrete imagery to evoke feeling, creates a turn or shift in perspective, and speaks to contemporary life while maintaining timeless resonance. What moment would you like to explore in tanka form?"
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
