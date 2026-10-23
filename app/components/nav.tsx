import Link from "next/link";
import { ThemeSwitch } from "./theme-switch";
import { metaData } from "../config";

const navItems = {
  "/projects": { name: "Projects" },
};

export function Navbar() {
  return (
    <nav className="home-c-navbar">
      <div className="home-c-nav">
        <Link href="/" className="home-c-logo">
          {metaData.title}
        </Link>
        <div className="home-c-nav-right">
          {Object.entries(navItems).map(([path, { name }]) => (
            <Link key={path} href={path} className="home-c-nav-link">
              {name}
            </Link>
          ))}
          <ThemeSwitch />
        </div>
      </div>
    </nav>
  );
}
