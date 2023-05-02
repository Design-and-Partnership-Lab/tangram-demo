import Marquee from "react-fast-marquee";
import Image from "next/image";

export default function Footer() {
  return (
    <div className="fixed bottom-4 right-0">
      <Marquee>
        {[
          "art",
          "building",
          "business",
          "care",
          "construction",
          "education",
          "engineer",
          "farming",
          "healthcare",
          "office",
          "production",
          "protective",
          "science",
        ].map((i) => (
          <div key={i} style={{ margin: "0px 40px" }}>
            <Image src={"/" + i + ".svg"} alt="logo" width={100} height={100} />
          </div>
        ))}
      </Marquee>
    </div>
  );
}
