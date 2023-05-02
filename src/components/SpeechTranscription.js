import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";
import { useState } from "react";
import { Microphone, Send, PlayerPause } from "tabler-icons-react";

export default function SpeechTranscription() {
  const [textToCopy, setTextToCopy] = useState();
  const [response, setResponse] = useState(null);

  const startListening = () =>
    SpeechRecognition.startListening({
      continuous: true,
      language: "en-US",
    });

  const { transcript } = useSpeechRecognition();

  const APIBODY = {
    model: "gpt-3.5-turbo",
    messages: [
      {
        role: "system",
        content:
          "You are an excellent bot, you provide excellent advices to students. Can you give me suggestions?",
      },
      { role: "user", content: transcript },
    ],
    max_tokens: 200,
    top_p: 1.0,
    frequency_penalty: 0.0,
    presence_penalty: 0.0,
  };

  async function handleTranscript() {
    await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${process.env.NEXT_PUBLIC_OPENAI_API_KEY}`,
      },
      body: JSON.stringify(APIBODY),
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setResponse(data.choices[0].message.content);
      })
      .catch((error) => {
        console.error(error);
      });
  }

  return (
    <div className="flex font-sans">
      <div className="flex-none w-48 relative">
        <h1>Reflect:</h1>
        <h2 className="text-red-800 flex flex-col items-center justify-between">
          As you explore careers, it’s important to imagine what you think life
          would be like in this potential career. Answer the following in 1 - 2
          minutes: Imagine yourself as a _______. What aspects of this life seem
          appealing to you? What aspects of this life seem unappealing to you?
        </h2>
        <p>Click to start and stop the recording.</p>
        <div onClick={() => setTextToCopy(transcript)}>{transcript}</div>
        <div className="list-none">
          <li>
            <button
              onClick={startListening}
              className="bg-purple-300 rounded-full py-4 px-4"
            >
              <Microphone size={48} strokeWidth={2} color={"black"} />
            </button>
          </li>
          <li>
            <button
              onClick={SpeechRecognition.stopListening}
              className="bg-blue-300 rounded-full py-4 px-4"
            >
              <PlayerPause size={48} strokeWidth={2} color={"black"} />
            </button>
          </li>
          <li>
            <button
              onClick={handleTranscript}
              className="bg-red-800 rounded-full py-4 px-4"
            >
              <Send size={48} strokeWidth={2} color={"black"} />
            </button>
          </li>
        </div>
      </div>
      <div className="flex flex-wrap border-2">
        <h1 className="text-2xl">Insights from AI:</h1>
        <p>{response}</p>
      </div>
    </div>
  );
}
