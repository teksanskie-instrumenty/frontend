import {
  Avatar,
  Button,
  Navbar, 
  NavbarBrand, 
  NavbarContent, 
  NavbarItem, 
  NavbarMenuToggle,
  NavbarMenu,
  NavbarMenuItem,
  Link
} from "@nextui-org/react";

import { useState } from "react";
import { useLocation } from 'react-router-dom';

import avatarSrc from '../assets/avatar-placeholder.gif';
import logoSrc from '../assets/logo.svg';

import { Link as RouterLink } from "react-router-dom";

import { useSession } from "../hooks/useSession";

import EmailPassword from 'supertokens-web-js/recipe/emailpassword';

function IntelliGymNavbar() {
  const [ isMenuOpen, setIsMenuOpen ] = useState(false);
  const location = useLocation();
  const session = useSession();

  const isDashboard = location.pathname.startsWith('/dashboard');
  const isAuthors = location.pathname.startsWith('/authors');

  const handleLogOutClick = async () => {
    await EmailPassword.signOut();
    session.invalidateSession();
  };

  return (
    <Navbar isBordered isBlurred maxWidth='full' onMenuOpenChange={setIsMenuOpen} style={{ background: 'linear-gradient(to right, rgba(63, 36, 90, 0.7) 0%, rgba(0, 0, 0, 0.7) 33%)'}}>
      <NavbarContent>
        <NavbarMenuToggle
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          className="sm:hidden"
          />
        <NavbarBrand>
          <RouterLink to='/dashboard'><img src={logoSrc}/></RouterLink>
        </NavbarBrand>
      </NavbarContent>
      <NavbarContent className="hidden sm:flex gap-4" justify='start'>
        <NavbarItem isActive>
          <Link as={RouterLink} color={isDashboard ? 'secondary' : 'foreground'} to='/dashboard'>Panel użytkownika</Link>
        </NavbarItem>
        <NavbarItem>
          <Link as={RouterLink} color={isAuthors ? 'secondary' : 'foreground'} to='/authors'>Autorzy</Link>
        </NavbarItem>
      </NavbarContent>
      <NavbarContent justify="end">
        <Avatar
          isBordered
          className="transition-transform"
          color="secondary"
          name="Jason Hughes"
          size="sm"
          src={avatarSrc}
        />
        <span className='hidden lg:inline'>Witaj, {session.nick || 'użytkowniku'}!</span>
        <NavbarItem>
          <Button as={Link} color="secondary" href="#" variant="flat" onClick={handleLogOutClick}>
            Wyloguj się
          </Button>
        </NavbarItem>
      </NavbarContent>
      <NavbarMenu>
        <NavbarMenuItem>
          <Link as={RouterLink} color={isDashboard ? 'secondary' : 'foreground'} to='/dashboard'>Panel użytkownika</Link>
        </NavbarMenuItem>
        <NavbarMenuItem>
          <Link as={RouterLink} color={isAuthors ? 'secondary' : 'foreground'} to='/authors'>Autorzy</Link>
        </NavbarMenuItem>
      </NavbarMenu>
    </Navbar>
  );
}

export default IntelliGymNavbar;
