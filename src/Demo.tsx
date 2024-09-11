import { useState } from "react";
import { GoogleGenerativeAI } from "@google/generative-ai";
import axios from "axios";
function App() {
  const genAI = new GoogleGenerativeAI(
    "AIzaSyAwFJNFHHIcUIq3IWy8VW314gmgWxNA4r0",
  );
  console.log(genAI, "api key");
  const [inputValue, setInputValue] = useState("");
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const [promptResponses, setpromptResponses] = useState<string[]>([]);

  const API_KEY =
    "sk-xZOuZZ9q1f5SptWcO4O2RDsVT6zoPpfI2CfgqpYi-yT3BlbkFJhqaekWmdRf5xeaAM1bs7k6eAZGc2mY89ySamMJMTQA";

  const getResponseForGivenPrompt = async () => {
    try {
      const model = genAI.getGenerativeModel({ model: "gemini-pro" });
      const result = await model.generateContent(inputValue);
      const response = await result.response;
      const text = await response.text();
      setpromptResponses((prev) => [...prev, text]);
    } catch (error) {
      console.log("Something Went Wrong");
    }
  };
  const [input, setInput] = useState("");
  const [response, setResponse] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChatGPTRequest = async () => {
    setLoading(true);
    try {
      const res = await axios.post(
        "https://api.openai.com/v1/chat/completions",
        {
          model: "gpt-3.5-turbo", // ChatGPT model
          messages: [{ role: "user", content: input }],
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${API_KEY}`,
          },
        },
      );

      setResponse(res.data.choices[0].message.content);
    } catch (error) {
      console.error("Error fetching the API", error);
    }
    setLoading(false);
  };

  return (
    <div style={{ display: "flex", gap: 30 }}>
      <div>
        <h1>Gemini</h1>
        <input
          type="text"
          value={inputValue}
          onChange={handleInputChange}
          placeholder="Ask Me Something You Want"
          className="input-field"
        />
        <button onClick={getResponseForGivenPrompt}>Send</button>
        {promptResponses.map((promptResponse, index) => (
          <div key={index}>
            <div>{promptResponse}</div>
          </div>
        ))}
      </div>
      <div>
        <h1>Chagpt</h1>
        <textarea
          rows={5}
          placeholder="Type your message here..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <br />
        <button onClick={handleChatGPTRequest} disabled={loading}>
          {loading ? "Loading..." : "Send"}
        </button>

        {response && (
          <div>
            <h3>ChatGPT Response:</h3>
            <p>{response}</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
