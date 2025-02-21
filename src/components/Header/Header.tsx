// Header.jsx
import { useState } from 'react';
import { Menu, X } from 'lucide-react';
import inform from '../../assets/inform.svg'
import informSmall from '../../assets/inform-small.svg'
import './Header.css';

const Avatar = ({ src, alt }: { src: string; alt: string }) => (
  <div className="avatar">
    {src ? (
      <img src={src} alt={alt} width="50" height="50" />
    ) : (
      <div className="avatar-fallback">{alt?.charAt(0) || 'U'}</div>
    )}
  </div>
);

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const menuItems = [
    { label: 'Manage Forms', href: '/manage' },
    { label: 'Preview', href: '/preview' },
    { label: 'Profile', href: '/profile' }
  ];

  return (
    <header className="header">
      <nav className="nav-container">
        <a href="#" target="_blank">
          <img height="50" src={inform} className="logo" alt="Inform logo" />
        </a>
        <div className="menu-toggle" onClick={() => setIsMenuOpen(!isMenuOpen)}>
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </div>

        <div className={`nav-menu ${isMenuOpen ? 'active' : ''}`}>
          {menuItems.map(item => (
            <a key={item.label} href={item.href} className="nav-link">
              {item.label}
            </a>
          ))}
        </div>

        <div className="nav-right">
          <Avatar src={informSmall} alt="User" />
        </div>
      </nav>
    </header>
  );
};

export default Header;