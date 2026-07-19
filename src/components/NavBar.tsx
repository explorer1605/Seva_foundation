import React from "react";
import { Link } from "react-router-dom";

export function NavBar() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-40 h-[72px] bg-canvas border-b border-divider-beige backdrop-blur-md bg-opacity-95">
      <div className="max-w-7xl mx-auto h-full px-6 flex items-center justify-between">
        <div className="flex items-center">
          <Link 
            to="/" 
            className="font-serif font-semibold text-primary-brown text-[18px] tracking-wide hover:text-[#C87941] transition-colors"
          >
            Gou Seva
          </Link>
        </div>

        <div className="flex gap-6 md:gap-8 items-center">
          <Link 
            to="/" 
            className="text-body-brown text-[15px] font-sans font-medium hover:text-primary-brown hover:underline underline-offset-4 decoration-2 transition-all"
            id="nav-link-home"
          >
            Home
          </Link>
          <a 
            href="#about" 
            className="text-body-brown text-[15px] font-sans font-medium hover:text-primary-brown hover:underline underline-offset-4 decoration-2 transition-all"
            id="nav-link-about"
          >
            About Us
          </a>
          <Link 
            to="/admin" 
            className="text-body-brown text-[15px] font-sans font-medium hover:text-primary-brown hover:underline underline-offset-4 decoration-2 transition-all"
            id="nav-link-admin"
          >
            Admin Panel
          </Link>
        </div>
      </div>
    </nav>
  );
}
