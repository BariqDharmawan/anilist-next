import { NAVBAR_LINKS } from "@/src/constants";
import { NavbarLink } from "./Navbar.styled";

export default function Navbar() {
  return (
    <div>
      {NAVBAR_LINKS.map((item) => (
        <NavbarLink key={item.link} href={item.link}>
          {item.title}
        </NavbarLink>
      ))}
    </div>
  );
}
