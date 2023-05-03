import React from "react";
import Lottie from "lottie-react";
import animationData from "../lotties/smile"; //TODO: change this

const SmallLoader = () => {
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };
  return (
    <div className="h-full flex justify-center items-center">
      {" "}
      {/* //TODO you may need to adust this */}
      <Lottie options={defaultOptions} height={90} width={160} />
      {/* //TODO you may need to adjust this */}
    </div>
  );
};

export default SmallLoader;
