import { NavbarItem } from "./NavbarItem";

const links = [
  { to: '/',       label: 'Início'    },
  { to: '/create', label: 'Criar'     },
  { to: '/update', label: 'Atualizar' },
  { to: '/delete', label: 'Deletar'   },
];

export default function Navbar() {
  return (
    <nav className="fixed top-0 inset-x-0 bg-gray-100 p-4 shadow z-10">
      <div className="max-w-4xl mx-auto flex justify-center gap-4">
        {links.map((link) => (
          <NavbarItem key={link.to} {...link} />
        ))}
      </div>
    </nav>
  );
}
