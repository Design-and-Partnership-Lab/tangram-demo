import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";
import { useState } from "react";
import useClipboard from "react-use-clipboard";

export default function SpeechTranscription() {
  const [textToCopy, setTextToCopy] = useState();
  const [isCopied, setCopied] = useClipboard(textToCopy);
  const startListening = () =>
    SpeechRecognition.startListening({
      continuous: true,
      language: "en-US",
    });

  const { transcript } = useSpeechRecognition();

  return (
    <div>
      <h2 className="text-red-800">Speech to text Converter</h2>
      <br />
      <p>
        a react hook that converts speech from the microphone to tex and blah
      </p>
      <div onClick={() => setTextToCopy(transcript)}>{transcript}</div>
      <div>
        <button onClick={setCopied}>
          Was it copied? {isCopied ? "Yes" : "No"}
        </button>
        <button onClick={startListening}>Start listening</button>
        <button
          onClick={SpeechRecognition.stopListening}
          className="btn btn-blue"
        >
          Stop listening
        </button>
      </div>
    </div>
  );
}
