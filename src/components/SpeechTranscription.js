import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";
import { useState } from "react";
import { Microphone, Send, PlayerPause } from "tabler-icons-react";

export default function SpeechTranscription() {
  const [textToCopy, setTextToCopy] = useState();
  const [response, setResponse] = useState(null);
  const CAREER_PATH = "Data Scientist";

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
          "Please read the following excerpt from an interview with an undergraduate student who is interested in becoming a " +
          CAREER_PATH +
          ". In up to 3 bullet points, identify what this student perceives as important values for themselves and this career path. Then in up to 3 bullet points, summarize back to the student what they have identified as challenges on their  path to becoming a " +
          CAREER_PATH +
          ". Finally, provide one question that a student might want to ask their mentor about in the future.",
      },
      {
        role: "user",
        content:
          "I think education is one of the most important things everybody goes through the education system. So I think it’s a really good and also children don’t know anything. So by giving, they start off not knowing anything. So by giving them the gift of Education, the tools of a good quality education. I think that’s important and it will help just Society in general and education really is a powerful transformative tool. So I want to do that and I think I really enjoy the work aspect of that. It would be rewarding cuz I’m actually actively helping people and I want to do a job where I’m actually about actually actively helping people and also it’s you could say the same for a doctor but at the same time you’ve working with people at the worst in Life but in education you working at people who have the opportunity to go someplace else. I know an issue with the Ph.D program especially with the first few years. It’ll be a lot of work understanding your bearings and stuff which I know can be difficult at first but overall I see way more upsides than downsides and I feel like getting a PhD and becoming a professor is a career I really want to pursue and that I’d be really happy cuz I really love research and I really love like teaching and that combines both of them. So I couldn’t think of a better career for myself.",
      },
      {
        role: "system",
        content:
          "Here are some aspects of your career path that you value: 1. Education is a powerful transformative tool. 2. Rewarding to actively help people. 3. Opportunity to work with people who have the potential to go somewhere else. Here are some challenges that you’ve imagined along your career path: You are excited about the prospect of pursuing a PhD and becoming a professor, as it combines your interests in research and teaching. 2. You anticipate that the first few years of the PhD program may be challenging as you adjust to the workload and find your bearings. 3. You believe that the benefits of this career path outweigh the challenges. Next time you talk to your mentor, consider asking them: What was your first year of the PhD. like? How did you get through it?",
      },
      // { role: "user", content: transcript },
      {
        role: "user",
        content:
          "A lot of the aspects of a job in research actually appeal to me and especially within both, education and Technology. I like to think through things and stops and break things down. I also like to think through and consider problems, that might need to be solved and the steps you might need to take to get there and I want to make sure that I work in a job that requires me to learn from and work with others in the future because I think there’s something new to be learned every day and I think there’s just something cool about what thinking of new ideas and working in an expanding field.	I don’t know if I would describe it as unappealing because in the same way, it’s a reason that this job or this feels as appealing to me, but maybe the fact that technology changes all the time and so there will always be new things to consider and new technologies that might disrupt the field or a specific thing that I might be working on. But I think at the same time technology always be used for good if we try and because I like both education and technology I would just want to take it as an opportunity to think and learn about how long what I’m working on might be made better through that.",
      },
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
