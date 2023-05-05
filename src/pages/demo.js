import NavBar from "../components/NavBar";
import router from "next/router";
import Footer from "../components/Footer";
import { useState } from "react";

const measureColors = {
  "Self-Positioning": "#F92949",
  Competency: "#FF7B00",
  "Social Capital": "#91CC26",
  "Structural Opportunity": "#F165E8",
  Navigation: "#50BAE4",
};
const measureInfo = {
  "Self-Positioning": [
    "This measure provides information about how young people identify their interests and values in relation to specific careers.",
    "Let’s pretend you’re talking to a freshman with no exposure to this field. Describe this career to them to the best of your ability.",
    "As youth explore careers, it’s important for them to imagine what they think life would be like in this potential career. As they learn more about the job, it’s important to refine their understanding and reflect on how it fits into their life.",
  ],
  Competency: [
    "This measure provides information about how young people perceive their knowledge and skills within specific careers",
    "How confident are you in succeeding in this type of work environment? What issues come to mind that relate to your confidence?",
    "Having a check-in about required levels of education, qualities, and work environment can help you find related opportunities,  resources, and pathways to strengthen your knowledge base.",
  ],
  "Social Capital": [
    "This measure provides information about the network that young people can leverage to develop occupational identities",
    "Think about who you turn to for deep life advice and help in your everyday life. Are there people that you can always count on for help? If so, please write down their names as a list.",
    "Your support network on your career journey includes both your personal and professional network. It's always nice to have one or two people across all of the areas (professional, personal, and the overlap).",
  ],
  "Structural Opportunity": [
    "This measure provides information about the extent to which young people have access to and can pursue opportunities related to the careers they want to achieve.",
    "Have you had opportunities to practice problem-solving skills in your day-to-day activities? It doesn’t have to be related to this career, just think about anytime in your life.",
    "Opportunities can come in many places, not just in settings specific to the job. The key is to notice those opportunities and pursue them!",
  ],
  Navigation: [
    "This measure provides information about how young people understand the pathways, requirements, challenges and opportunities towards a career.",
    "Now take a moment and visualize what steps you think you need to take, in order to see yourself in this career. Can you list and describe the important steps or goals that you see for yourself?",
    "People who are successful in their careers learn how to make a plan. They learn about what steps they need to take in order to achieve their goals.",
  ],
};
export default function Demo() {
  const handleSubmit = async (event) => {
    event.preventDefault();
    if (event.target.career.value === "") {
      return;
    }
    setValid(true);
    router.push({
      pathname: "/speechInput",
      query: {
        career: event.target.career.value,
      },
    });
  };
  const [valid, setValid] = useState(false);
  const [measure, setMeasure] = useState("Self-Positioning");
  return (
    <div className="flex flex-col items-center justify-between w-full h-screen">
      <header className="flex justify-start w-full items-center">
        <NavBar />
      </header>
      <div className="h-full w-full grid grid-cols-4 px-16 gap-16">
        <div className="col-span-1 flex flex-col gap-2 justify-center items-center">
          {/* <p className="flex justify-center">
            Click to learn more about each practical measure:
          </p> */}
          <label
            htmlFor="pm-modal"
            onClick={() => setMeasure("Self-Positioning")}
            className="btn btn-outline w-full h-16 bg-[#F92949] text-white shadow-xl"
          >
            Self-positioning
          </label>
          <label
            htmlFor="pm-modal"
            onClick={() => setMeasure("Competency")}
            className="btn btn-outline w-full h-16 bg-[#FF7B00] text-white shadow-xl"
          >
            Competency
          </label>
          <label
            htmlFor="pm-modal"
            onClick={() => setMeasure("Social Capital")}
            className="btn btn-outline w-full h-16 bg-[#91CC26] text-white shadow-xl"
          >
            Social Capital
          </label>
          <label
            htmlFor="pm-modal"
            onClick={() => setMeasure("Structural Opportunity")}
            className="btn btn-outline w-full h-16 bg-[#F165E8] text-white shadow-xl"
          >
            Structural Opportunity
          </label>
          <label
            htmlFor="pm-modal"
            onClick={() => setMeasure("Navigation")}
            className="btn btn-outline w-full h-16 bg-[#50BAE4] text-white shadow-xl"
          >
            Navigation
          </label>
        </div>
        <input type="checkbox" id="pm-modal" className="modal-toggle" />
        <div className="modal">
          <div className="modal-box">
            <h3 className="font-bold text-2xl">Measure: {measure}</h3>
            <div className="py-4 text-xl text-slate-600">
              <div
                className={`badge bg-[${measureColors[measure]}] border-none text-white font-bold`}
              >
                About the Measure{" "}
              </div>{" "}
              {measure ? measureInfo[measure][0] : null}
            </div>
            <div className="py-4 text-xl text-slate-600">
              <div
                className={`badge bg-[${measureColors[measure]}] border-none text-white font-bold`}
              >
                Rationale{" "}
              </div>{" "}
              {measure ? measureInfo[measure][2] : null}
            </div>
            <div className="py-4 text-xl text-slate-600">
              <div
                className={`badge bg-[${measureColors[measure]}] border-none text-white font-bold`}
              >
                Example Question{" "}
              </div>{" "}
              {measure ? measureInfo[measure][1] : null}
            </div>

            <div className="modal-action">
              <label htmlFor="pm-modal" className="btn">
                Close
              </label>
            </div>
          </div>
        </div>

        <div className="col-span-3 flex flex-col justify-center items-start m-12">
          <div className="flex flex-col gap-4 w-[80%] text-2xl">
            <h1 className="text-5xl font-bold">Demo</h1>
            <p>
              In this demo, you will pretend that you are a sophomore in college
              trying to figure out your summer plans...{" "}
            </p>
            <p>
              You will be asked to reflect on your{" "}
              <span className="underline">Self-Positioning</span> (1 of 5 facets
              of the Practical Measures).
            </p>
            <p>
              <span className="font-bold">First,</span> click to learn more
              about each practical measures on the left.
            </p>
            <p>
              <span className="font-bold">Then,</span> begin the demo by
              inputting your career of interest below.
            </p>
          </div>
          <form onSubmit={handleSubmit} className="font-body">
            <div className="form-control w-full max-w-xs">
              <label className="label">
                {/* <span className="label-text">e.g. data scientist, dentist</span> */}
                {/* <span className="label-text-alt">Top Right label</span> */}
              </label>
              <input
                type="text"
                id="career"
                placeholder="Type here"
                required
                className="input input-bordered w-full max-w-xs"
              />
              <label className="label">
                <span className="label-text">e.g. data scientist, dentist</span>
                {/* <span className="label-text-alt">Bottom Right label</span> */}
              </label>
              <button
                type="submit"
                className="btn btn-primary mt-4 mb-12 disabled:loading"
                disabled={valid}
              >
                Go to demo
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
