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

import avatarSrc from '../assets/avatar-placeholder.gif';
import logoSrc from '../assets/logo.svg';

function IntelliGymNavbar() {
  return (
    <Navbar isBordered isBlurred maxWidth='full'>
      <NavbarBrand>
        <img src={logoSrc}/>
      </NavbarBrand>
      <NavbarContent className="hidden sm:flex gap-4" justify='start'>
        <NavbarItem isActive>
          <Link color='secondary' href='#'>Panel użytkownika</Link>
        </NavbarItem>
        <NavbarItem>
          <Link color='foreground' href='#'>Autorzy</Link>
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
        Witaj, jacek84!
        <NavbarItem>
          <Button as={Link} color="secondary" href="#" variant="flat">
            Wyloguj się
          </Button>
        </NavbarItem>
      </NavbarContent>
    </Navbar>
  );
}

export default IntelliGymNavbar;
