import NavBar from "../components/NavBar";
import router from "next/router";
import Footer from "../components/Footer";
import Image from "next/image";

export default function Overview() {
  return (
    <div className="flex flex-col items-center justify-between w-full h-screen">
      <NavBar />
      <main className="flex flex-grow flex-col justify-center w-full items-center">
        <Hero />
      </main>
    </div>
  );
}

const Hero = () => {
  return (
    <>
      <h1 className="text-5xl py-2">How it works</h1>
      <div className="grid grid-cols-1 gap-4 md:gap-4 md:grid-cols-3 w-full lg:flex-row">
        <div className="col-span-1 h-fit justify-center flex">
          <div className="card w-96 h-[34rem] bg-base-100 shadow-lg pt-8">
            <figure>
              <Image
                src="/pms.png"
                alt="list of practical measures"
                width={200}
                height={250}
              />
            </figure>
            <div className="card-body">
              <h2 className="text-2xl text-center font-bold">
                Practical Measures
              </h2>
              <p>
                We’ve developed a quick and simple way to collect formative data
                of different facets of youths’ identity, through what we
                classify as Practical Measures.
              </p>
              {/* <div className="card-actions justify-center">
                <a
                  href="https://sites.uci.edu/axcis"
                  target="_blank"
                  className="btn btn-outline"
                >
                  Learn more ↗
                </a>
              </div> */}
            </div>
          </div>
        </div>
        <div className="col-span-1 h-fit flex justify-center">
          <div className="card w-96 h-[34rem] bg-base-100 shadow-lg pt-4">
            <div className="mockup-window mx-8 mt-4 border border-base-300">
              <div className="flex justify-center px-4 py-6 border-t bg-[#91CC26] border-base-300">
                <Image
                  src="/aianalysis.svg"
                  alt="icon of a mic and the open ai logo"
                  width={200}
                  height={250}
                />
              </div>
            </div>

            <div className="card-body">
              <h2 className="text-2xl text-center font-bold">
                AI-augmented Analysis
              </h2>
              <p>
                <span className="font-bold">First,</span> we ask students to
                reflect on the Practical Measures via audio recordings.
              </p>
              <p>
                <span className="font-bold">Then,</span> we use ChatGPT to
                analyze their answers and provide summaries and suggestions for
                what to discuss with their mentor(s).
              </p>
              {/* <div className="card-actions justify-center">
                <button className="btn btn-outline">Learn more</button>
              </div> */}
            </div>
          </div>
        </div>
        <div className="col-span-1 h-fit flex justify-center">
          <div className="card w-96 h-[34rem] bg-base-100 shadow-lg pt-8">
            <figure>
              <Image
                src="/mentors.svg"
                alt="two people talking"
                width={200}
                height={250}
              />
            </figure>
            <div className="card-body">
              <h2 className="text-2xl text-center font-bold">
                Stronger Human Relationships
              </h2>
              <p>
                Instead of replacing mentors, this app provides a way for
                mentors and mentees to be better informed and prepared for
                in-person meetings, in order to foster stronger mentee-mentor
                relationships.
              </p>
              {/* <div className="card-actions justify-center">
                <button className="btn btn-outline">Learn more</button>
              </div> */}
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-row gap-4">
        <button
          className="btn btn-default my-12"
          onClick={() => {
            router.push("/");
          }}
        >
          Previous
        </button>
        <button
          className="btn btn-primary my-12"
          onClick={() => {
            router.push("/demo");
          }}
        >
          Go to demo
        </button>
      </div>
    </>
  );
};
