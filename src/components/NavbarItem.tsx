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
        'px-4 py-2 rounded font-medium transition-all duration-200',
        'cursor-pointer select-none',
        'inline-flex items-center justify-center',
        'shadow-sm hover:shadow active:shadow-inner',
        isActive
          ? 'bg-blue-600 text-white hover:bg-blue-700 active:bg-blue-800'
          : 'bg-white text-blue-600 hover:bg-blue-50 active:bg-blue-100'
      ].join(' ')
    }
  >
    {label}
  </NavLink>
);