import NavBar from "../components/NavBar";
import router from "next/router";
import Footer from "../components/Footer";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-between w-full h-screen">
      <header className="flex justify-start w-full items-center">
        <NavBar />
      </header>
      <main className="flex justify-center w-full items-start">
        <Hero />
      </main>
      <footer>
        <Footer />
      </footer>
    </div>
  );
}

function Hero() {
  return (
    <div className="hero min-h-[80%]">
      <div className="m-12 mt-20 hero-content flex-col lg:flex-row">
        <img
          src="/welcomephone.svg"
          alt="gates"
          className="max-w-sm rounded-lg"
        />
        <div>
          <h1 className="text-5xl">
            <span className="font-bold">Question:</span> How can we help young
            people develop deeper identities toward career pathways?
          </h1>
          <h1 className="text-5xl py-6">
            <span className="font-bold">The Gates Project:</span> An
            AI-augmented space for reflection for undergraduates exploring their
            careers
          </h1>
          <button
            className="btn btn-primary mb-12"
            onClick={() => {
              router.push("/overview");
            }}
          >
            How it Works
          </button>
        </div>
      </div>
    </div>
  );
}
