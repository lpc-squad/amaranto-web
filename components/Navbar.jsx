import Link from "next/link";

function Navbar() {
  return (
    <nav>
      <ul>
        <li>
          <Link href="/">
            <a>Link</a>
          </Link>
        </li>
        <li>
          <Link href="/">
            <a>Link</a>
          </Link>
        </li>
        <li>
          <Link href="/">
            <a>Link</a>
          </Link>
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;
