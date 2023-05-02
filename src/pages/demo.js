import NavBar from "../components/NavBar";
import router from "next/router";
import Footer from "../components/Footer";

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
  return (
    <div className="flex flex-col items-center justify-between w-full h-screen">
      <header className="flex justify-start w-full items-center">
        <NavBar />
      </header>
      <main className="flex flex-col justify-center w-full items-center">
        <p>todo: demo</p>
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
      </main>
      <footer>
        <Footer />
      </footer>
    </div>
  );
}
