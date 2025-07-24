import Link from "next/link";
import CartIcon from "./CartIcon";
import UserMenu from "./UserMenu";

export default function Navbar() {
  return (
    <nav className="flex items-center justify-between py-4 px-6 bg-black text-white">
      <div className="flex items-center gap-6">
        <Link href="/" className="font-bold text-xl tracking-wide">DÄger</Link>
        <Link href="/productos" className="hover:underline">Productos</Link>
      </div>
      <div className="flex items-center gap-4">
        <CartIcon />
        <UserMenu />
      </div>
    </nav>
  );
}