import NavBar from "../components/NavBar";
import router from "next/router";
import Footer from "../components/Footer";
import { useState } from "react";

const measureInfo = {
  "Self-Positioning": [
    "As youth explore careers, it’s important for them to imagine what they think life would be like in this potential career. As they learn more about the job, it’s important to refine their understanding and reflect on how it fits into their life.",
    "This measure provides information about how young people identify their interests and values in relation to specific careers.",
  ],
  Competency: ["", ""],
  "Social Capital": ["", ""],
  "Structural Opportunity": ["", ""],
  Navigation: ["", ""],
};
export default function Demo() {
  const handleSubmit = async (event) => {
    event.preventDefault();
    router.push({
      pathname: "/speechInput",
      query: {
        career: event.target.career.value,
      },
    });
  };
  const [measure, setMeasure] = useState("self-positioning");
  return (
    <div className="flex flex-col items-center justify-between w-full h-screen">
      <header className="flex justify-start w-full items-center">
        <NavBar />
      </header>
      <div className="h-full w-full grid grid-cols-4 mx-4 px-8 gap-8">
        <div className="col-span-1 flex flex-col gap-2 justify-center items-center">
          <p>Click to learn more about each practical measure:</p>
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
            <h3 className="font-bold text-lg">Measure: {measure}</h3>
            <p className="py-4">{measureInfo[measure]}</p>
            <p className="py-4">{measureInfo[measure]}</p>

            <div className="modal-action">
              <label htmlFor="pm-modal" className="btn">
                Close
              </label>
            </div>
          </div>
        </div>

        <div className="col-span-3 flex flex-col justify-center items-start bg-blue-200">
          <h1 className="text-5xl font-bold">Box Office News!</h1>
          <form onSubmit={handleSubmit} className="font-body">
            <div className="form-control w-full max-w-xs">
              <label className="label">
                <span className="label-text">Career of interest</span>
                {/* <span className="label-text-alt">Top Right label</span> */}
              </label>
              <input
                type="text"
                id="career"
                placeholder="Type here"
                className="input input-bordered w-full max-w-xs"
              />
              <label className="label">
                {/* <span className="label-text-alt">Bottom Left label</span>
              <span className="label-text-alt">Bottom Right label</span> */}
              </label>
              <button type="submit" className="btn btn-primary mb-12">
                Go to demo
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
