import "dotenv/config";

const generatePerplexityResponse = async (message) => {
  const options = {
    method: "POST",
    headers: {
      Authorization: `Bearer ${process.env.PERPLEXITY_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model: "sonar-pro",
      messages: [
        {
          role: "user",
          content: message,
        },
      ],
    }),
  };

  try {
    const response = await fetch(
      "https://api.perplexity.ai/chat/completions",
      options
    );

    const data = await response.json();
    return data.choices[0].message.content; // reply from Perplexity
  } catch (error) {
    console.error("Error fetching from Perplexity API:", error);
    res.status(500).json({ error: "Failed to fetch response from Perplexity" });
  }
};

export default generatePerplexityResponse;
