import { Navbar } from "react-bulma-components";
import Link from "next/link";

function CustomNavbar() {
  return (
    <Navbar>
      <Navbar.Container>
        <Navbar.Item>
          <Link href="/">
            <a>Inicio</a>
          </Link>
        </Navbar.Item>
        <Navbar.Item>
          <Link href="/patient/new">
            <a>Pacientes</a>
          </Link>
        </Navbar.Item>
      </Navbar.Container>
    </Navbar>
  );
}

export default CustomNavbar;
