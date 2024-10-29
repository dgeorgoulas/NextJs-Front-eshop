// src/app/Header.tsx
import Image from 'next/image';
import Link from 'next/link';

import logo from '../../public/images/update.png'; // Adjust this path based on where your logo is located

const Header = () => {

  return (
    <header className="flex items-center justify-between py-4 px-8 bg-white border-b">
      {/* Logo */}
      <div className="flex items-center">
        <Link href="/">
          {/* Adjust the width and height for a smaller logo */}
          <Image src={logo} alt="Logo" width={40} height={40} className="logo" />
        </Link>

        {/* Combined Navigation Links */}
        <nav className="flex space-x-4 ml-4">
          <Link href="/women" className="text-gray-900">Women</Link>
          <Link href="/men" className="text-gray-900">Men</Link>
          <Link href="/kids" className="text-gray-900">Kids</Link>
          <Link href="/classic" className="text-gray-900">Classic</Link>
          <Link href="/sport" className="text-gray-900">Sport</Link>
          <Link href="/sale" className="text-gray-900">Sale</Link>
        </nav>
      </div>

      {/* Icons (Wishlist, Cart, Profile) */}
      <div className="flex space-x-4">
        <Link href="/favorites" className="text-gray-900">❤️</Link>
        <Link href="/cart" className="relative text-gray-900">
          🛒
          <span className="absolute top-0 right-0 bg-red-500 text-white text-xs rounded-full px-1">1</span>
        </Link>
        <Link href="/login" className="text-gray-900">👤</Link>
      </div>
    </header>
  );
};

export default Header;
