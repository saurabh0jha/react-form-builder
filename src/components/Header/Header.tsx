import { NavLink } from "react-router-dom";
import inform from "../../assets/inform.svg";
import informSmall from "../../assets/inform-small.svg";
import "./Header.css";

const Avatar = ({ src, alt }: { src: string; alt: string }) => (
  <div className="avatar">
    {src ? (
      <img src={src} alt={alt} width="50" height="50" />
    ) : (
      <div className="avatar-fallback">{alt?.charAt(0) || "U"}</div>
    )}
  </div>
);

const Header = () => {
  const menuItems = [
    { label: "Manage", href: "/forms" },
    { label: "Generate", href: "/generate" },
    { label: "Preview", href: "/preview" },
    { label: "Profile", href: "/profile" },
  ];

  return (
    <header className="header">
      <nav className="nav-container">
        <a href="/">
          <img height="50" src={inform} className="logo" alt="Inform logo" />
        </a>

        {menuItems.map((item) => (
          <NavLink to={item.href} className="nav-link">
            {item.label}
          </NavLink>
        ))}

        <div className="nav-right">
          <Avatar src={informSmall} alt="User" />
        </div>
      </nav>
    </header>
  );
};

export default Header;
