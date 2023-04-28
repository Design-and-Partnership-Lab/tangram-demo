import NavBar from "../components/NavBar";
import router from "next/router";
import Footer from "../components/Footer";

export default function Overview() {
  return (
    <div className="flex flex-col items-center justify-between w-full h-screen">
      <header className="flex justify-start w-full items-center">
        <NavBar />
      </header>
      <main className="flex flex-col justify-center w-full items-center">
        <p>todo: overview</p>
        <button
          className="btn btn-primary mb-12"
          onClick={() => {
            router.push("/speechInput");
          }}
        >
          Go to demo
        </button>
      </main>
      <footer>
        <Footer />
      </footer>
    </div>
  );
}
