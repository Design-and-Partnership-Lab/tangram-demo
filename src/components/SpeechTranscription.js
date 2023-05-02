import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";
import { useState, useEffect } from "react";
import { Microphone, Send, PlayerPause } from "tabler-icons-react";
import { useRouter } from "next/router";

export default function SpeechTranscription() {
  const [textToCopy, setTextToCopy] = useState();
  const [response, setResponse] = useState(null);
  const [speechState, setSpeechState] = useState("record");
  const router = useRouter();
  const CAREER_PATH = router.query.career;
  const [values, setValues] = useState("");
  const [challenges, setChallenges] = useState("");
  const [questions, setQuestions] = useState("");

  const startListening = () => {
    SpeechRecognition.startListening({
      continuous: true,
      language: "en-US",
    });
    setSpeechState("pause");
  };

  const stopListening = () => {
    SpeechRecognition.stopListening();
    setSpeechState("record");
  };

  const { transcript } = useSpeechRecognition();
  const existing_transcript =
    "A lot of the aspects of a job in research actually appeal to me and especially within both, education and Technology. I like to think through things and stops and break things down. I also like to think through and consider problems, that might need to be solved and the steps you might need to take to get there and I want to make sure that I work in a job that requires me to learn from and work with others in the future because I think there’s something new to be learned every day and I think there’s just something cool about what thinking of new ideas and working in an expanding field.	I don’t know if I would describe it as unappealing because in the same way, it’s a reason that this job or this feels as appealing to me, but maybe the fact that technology changes all the time and so there will always be new things to consider and new technologies that might disrupt the field or a specific thing that I might be working on. But I think at the same time technology always be used for good if we try and because I like both education and technology I would just want to take it as an opportunity to think and learn about how long what I’m working on might be made better through that.";

  const APIBODY = {
    model: "gpt-3.5-turbo",
    messages: [
      {
        role: "system",
        content:
          "Please read the following excerpt from an interview with an undergraduate student who is interested in becoming a " +
          CAREER_PATH +
          ". In up to 3 bullet points, identify what this student perceives as important values for themselves and this career path. Then in up to 3 bullet points, summarize back to the student what they have identified as challenges on their path to becoming a " +
          CAREER_PATH +
          ". Finally, provide one question that a student might want to ask their mentor about in the future." +
          ' Give the response to each section as a list with three semi-colons separating each one. Within each response, each listed item should be a double quote string. There should be no other text descriptors and it should be possible to use each list directly in python as a list. For example, if the values are apples, oranges, and bananas; the challenges are pears, grapes; and the questions are strawberries, melons; then the following should be the output: ["apples", "oranges", "bananas"];;;["pears", "grapes"];;;["strawberries", "melons"]]',
      },
      {
        role: "user",
        content:
          "I think education is one of the most important things everybody goes through the education system. So I think it’s a really good and also children don’t know anything. So by giving, they start off not knowing anything. So by giving them the gift of Education, the tools of a good quality education. I think that’s important and it will help just Society in general and education really is a powerful transformative tool. So I want to do that and I think I really enjoy the work aspect of that. It would be rewarding cuz I’m actually actively helping people and I want to do a job where I’m actually about actually actively helping people and also it’s you could say the same for a doctor but at the same time you’ve working with people at the worst in Life but in education you working at people who have the opportunity to go someplace else. I know an issue with the Ph.D program especially with the first few years. It’ll be a lot of work understanding your bearings and stuff which I know can be difficult at first but overall I see way more upsides than downsides and I feel like getting a PhD and becoming a professor is a career I really want to pursue and that I’d be really happy cuz I really love research and I really love like teaching and that combines both of them. So I couldn’t think of a better career for myself.",
      },
      {
        role: "system",
        content:
          '["Education is a powerful transformative tool.", "Rewarding to actively help people.", "Opportunity to work with people who have the potential to go somewhere else."];;;["You are excited about the prospect of pursuing a PhD and becoming a professor, as it combines your interests in research and teaching.", "You anticipate that the first few years of the PhD program may be challenging as you adjust to the workload and find your bearings."];;;["What was your first year of the PhD. like?", "How did you get through it?"]',
      },
      {
        role: "user",
        content: speechState == "transcript" ? existing_transcript : transcript,
      },
      // {
      //   role: "user",
      //   content:
      //     "A lot of the aspects of a job in research actually appeal to me and especially within both, education and Technology. I like to think through things and stops and break things down. I also like to think through and consider problems, that might need to be solved and the steps you might need to take to get there and I want to make sure that I work in a job that requires me to learn from and work with others in the future because I think there’s something new to be learned every day and I think there’s just something cool about what thinking of new ideas and working in an expanding field.	I don’t know if I would describe it as unappealing because in the same way, it’s a reason that this job or this feels as appealing to me, but maybe the fact that technology changes all the time and so there will always be new things to consider and new technologies that might disrupt the field or a specific thing that I might be working on. But I think at the same time technology always be used for good if we try and because I like both education and technology I would just want to take it as an opportunity to think and learn about how long what I’m working on might be made better through that.",
      // },
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
        const resp = data.choices[0].message.content;
        const resp_arr = resp.split(";;;");
        setValues(JSON.parse(resp_arr[0]));
        setChallenges(JSON.parse(resp_arr[1]));
        setQuestions(JSON.parse(resp_arr[2]));
      })
      .catch((error) => {
        console.error(error);
      });
  }

  return (
    <div className="grid grid-rows-1 grid-cols-2 gap-16 mt-3 mx-24">
      <div className="col-span-1 p-5 relative flex flex-col items-center">
        <h1 className="text-5xl font-bold text-black">Reflect:</h1>
        <h2 className="flex flex-col items-center justify-between mt-4 px-4 text-xl">
          <p className="text-center">
            As you explore careers, it’s important to imagine what you think
            life would be like in this potential career.
          </p>
          <br />
          <p className="text-center">
            <b>Answer the following in 1 - 2 minutes:</b> Imagine yourself as a
            {CAREER_PATH}. What aspects of this life seem appealing to you? What
            aspects of this life seem unappealing to you?
          </p>
        </h2>
        <div className="bg-red-500" onClick={() => setTextToCopy(transcript)}>
          {transcript}
        </div>
        <div className="border rounded-lg border-gray-500 m-4 p-8 w-full list-none h-[378px] overflow-y-auto">
          {(speechState == "record" || speechState == "pause") && (
            <span className="flex flex-col justify-center items-center w-full h-full">
              {speechState == "record" && (
                <li>
                  <button
                    onClick={startListening}
                    className="bg-[#F3F3F3] rounded-full py-8 px-8"
                  >
                    <Microphone size={112} strokeWidth={2} color={"#A3A3A3"} />
                  </button>
                </li>
              )}
              {speechState == "pause" && (
                <li>
                  <button
                    onClick={stopListening}
                    className="bg-[#F3F3F3] rounded-full py-8 px-8"
                  >
                    <PlayerPause size={112} strokeWidth={2} color={"#A3A3A3"} />
                  </button>
                </li>
              )}

              <p className="pt-6 text-xl font-normal">
                Click to start and stop the recording.
              </p>
            </span>
          )}
          {speechState == "transcript" && <p>{existing_transcript}</p>}
        </div>
        <div className="flex mt-2 gap-5">
          {(speechState == "record" || speechState == "pause") && (
            <button
              onClick={() => setSpeechState("transcript")}
              className="bg-[#BABABA] min-w-[215px] font-bold text-white text-lg py-4 px-5 rounded-xl"
            >
              Or Select Existing
            </button>
          )}
          {speechState == "transcript" && (
            <button
              onClick={() => setSpeechState("record")}
              className="bg-[#BABABA] min-w-[215px] font-bold text-white text-lg py-4 px-5 rounded-xl"
            >
              Or Record Your Own
            </button>
          )}
          <button
            onClick={handleTranscript}
            className="bg-black font-bold text-white text-lg py-4 px-5 rounded-xl"
          >
            Submit
          </button>
        </div>
      </div>
      <div className="col-span-1 px-10 py-5 mt-8 border rounded-2xl border-[#F92949] h-[700px] overflow-y-auto">
        <span className="flex flex-col place-self-start">
          <h1 className="text-5xl text-black font-bold mt-3 text-center">
            Insights from AI:
          </h1>
          {values != "" && (
            <span className="text-lg">
              <p className="mt-7 font-bold">
                According to your audio survey, these are your values:
              </p>
              {values.map((it) => (
                <li className="">{it}</li>
              ))}
              <p className="mt-5 font-bold">The following aspects surfaced:</p>
              {challenges.map((it) => (
                <li>{it}</li>
              ))}
              <p className="mt-5 font-bold">Have you ever considered: </p>
              {questions.map((it) => (
                <li>{it}</li>
              ))}

              <div className="rounded-2xl bg-[#F92949] text-white text-center p-6 mt-5 mb-3">
                <p>
                  Note: This is an example of the practical measure “Envision
                  Yourself in the Work”.
                </p>
                <p>
                  This information might be helpful for a mentor to know in
                  order to better guide mentees who have limited exposure to
                  various aspects of a career.
                </p>
              </div>
            </span>
          )}
        </span>
      </div>
    </div>
  );
}
