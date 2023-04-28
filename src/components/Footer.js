import Marquee from "react-fast-marquee";
import Image from "next/image";

export default function Footer() {
  return (
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
        <div key={i} style={{ margin: "40px 40px" }}>
          <Image src={"/" + i + ".svg"} alt="logo" width={100} height={100} />
        </div>
      ))}
    </Marquee>
  );
}
