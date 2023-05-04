import Image from "next/image";

export default function Navbar() {
  return (
    <div className="navbar bg-base-100">
      <div className="flex-1">
        <a className="btn btn-ghost normal-case text-xl">
          <Image src="/daplablogo.png" alt="logo" width={100} height={60} />
        </a>
      </div>
      <div className="flex-none">
        <ul className="menu menu-horizontal px-1">
          <li>
            <a href="/">Home</a>
          </li>
        </ul>
      </div>
    </div>
  );
}
