const OPENROUTER_API_KEY = "YOUR_API_KEY";
const TELEGRAM_TOKEN = "YOUR_TELEGRAM_TOKEN";
const CHAT_ID = "YOUR_CHAT_ID";
function sendDailyDSAQuestions() {

    const today = new Date().toDateString();
    const random = Math.floor(Math.random() * 1000);
    
    const prompt = `
    Date: ${today}
    Seed: ${random}
    
    Generate 3 UNIQUE Data Structures and Algorithms interview questions.
    
    Rules:
    - No repetition
    - One Easy, Medium, Hard
    - Different topics daily
    - No solutions
    `;

  const url = "https://openrouter.ai/api/v1/chat/completions";

  const payload = {
    model: "deepseek/deepseek-chat",
    messages: [
      {
        role: "user",
        content: prompt
      }
    ]
  };

  const options = {
    method: "post",
    contentType: "application/json",
    headers: {
      "Authorization": "Bearer " + OPENROUTER_API_KEY,
      "HTTP-Referer": "https://script.google.com",
      "X-Title": "DSA Telegram Bot"
    },
    payload: JSON.stringify(payload)
  };

  const response = UrlFetchApp.fetch(url, options);
  const data = JSON.parse(response.getContentText());

  const aiText = data.choices[0].message.content;

  const message = "🚀 Daily DSA Practice\n\n" + aiText;

  const telegramUrl = "https://api.telegram.org/bot" + TELEGRAM_TOKEN + "/sendMessage";

  UrlFetchApp.fetch(telegramUrl, {
    method: "post",
    contentType: "application/json",
    payload: JSON.stringify({
      chat_id: CHAT_ID,
      text: message
    })
  });

}
