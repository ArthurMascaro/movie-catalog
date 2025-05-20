import { NavbarItem } from "./Children/NavbarItem";
import './navbar.css';

const links = [
  { to: '/',       label: 'Início'    },
  { to: '/create', label: 'Criar'     },
  { to: '/update', label: 'Atualizar' },
  { to: '/delete', label: 'Deletar'   },
];

export default function Navbar() {
    return (
    <nav className="w-full mt-2">
      <div className="flex justify-center space-x-3">
        {links.map((link) => (
          <NavbarItem key={link.to} {...link} />
        ))}
      </div>
    </nav>
  );
}
