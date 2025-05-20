// src/components/Navbar.tsx
import { NavLink } from 'react-router-dom';

interface NavbarItemProps {
  to: string;
  label: string;
}

export const NavbarItem = ({ to, label }: NavbarItemProps) => (
  <NavLink
        to={to}
        end={true}  
        className={({ isActive }) =>
          [
            'navbar-link',
            'font-medium',
            'cursor-pointer select-none',
            isActive ? 'active' : ''
          ].join(' ')
        }
      >
        {label}
  </NavLink>
);

