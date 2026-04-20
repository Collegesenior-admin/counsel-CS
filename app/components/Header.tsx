'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { Menu, X } from 'lucide-react';
import EnquiryFormModal from './EnquiryFormModal';
import { useScrollLock } from '../hooks/useScrollLock';

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const pathname = usePathname();

  // Lock scroll when mobile nav is open
  useScrollLock(isOpen);

  const isHomePage = pathname === '/';

  // ✅ Detect 20% scroll
  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight =
        document.documentElement.scrollHeight - window.innerHeight;

      const scrollPercent = (scrollTop / docHeight) * 100;
      setIsScrolled(scrollPercent > 15);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // ✅ Final style switch
  const useGrayStyle = !isHomePage || isScrolled;

  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'Colleges', href: '/colleges' },
    { name: 'Courses', href: '/courses' },
    { name: 'Updates', href: '/updates' },
    { name: 'About', href: '/about' },
    { name: 'Contact', href: '/contact' },
  ];

  const logoSrc = useGrayStyle
    ? "/logowhite.svg"
    : "/collegesenior logo B.svg";

  // ✅ Dynamic link styles
  const getLinkStyle = (href: string) => {
    const isActive = pathname === href;

    return `px-3 py-2 transition font-medium ${
      !useGrayStyle
        ? isActive
          ? 'text-yellow-400'
          : 'text-white hover:text-yellow-400'
        : isActive
          ? 'text-blue-600'
          : 'text-gray-700 hover:text-blue-600'
    }`;
  };

  return (
    <header
      className={`max-w-387 mx-auto sticky top-0 z-40 transition-colors duration-300 ${
        useGrayStyle ? 'bg-[#FFF5EE]' : 'bg-[#0d68f2]'
      }`}
    >
      <div className="flex items-center justify-between px-4 lg:px-12 py-3 max-w-400 mx-auto">

        {/* Logo */}
        <Link href="/" className="flex items-center">
          <Image
            src={logoSrc}
            alt="College Senior Logo"
            width={200}
            height={60}
            className="w-auto h-10 md:h-12 transition-opacity duration-300"
          />
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden min-[1300px]:flex space-x-6 text-lg">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className={getLinkStyle(link.href)}
            >
              {link.name}
            </Link>
          ))}
        </nav>

        {/* Action Buttons */}
        <div className="flex items-center space-x-4">

          <div className="hidden min-[1300px]:flex items-center space-x-4">

            <button
              onClick={() => setIsModalOpen(true)}
              className={`px-4 py-2 font-semibold border rounded-lg transition ${
                !useGrayStyle
                  ? 'text-white border-white hover:bg-white hover:text-blue-600'
                  : 'text-blue-600 border-blue-600 hover:bg-blue-600 hover:text-white'
              }`}
            >
              Apply to Enquiry
            </button>

            <Link
              href="/contact"
              className={`px-6 py-2 rounded-md font-semibold transition ${
                !useGrayStyle
                  ? 'bg-white text-[#0d68f2] hover:bg-gray-100'
                  : 'bg-blue-600 text-white hover:bg-blue-700'
              }`}
            >
              Talk to Expert
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            className={`min-[1300px]:hidden p-2 transition-transform duration-300 active:scale-90 ${
              !useGrayStyle ? 'text-white' : 'text-gray-800'
            }`}
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X size={32} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`
          min-[1300px]:hidden absolute w-full left-0 overflow-hidden transition-all duration-500 ease-in-out
          ${useGrayStyle ? 'bg-[#FFF5EE]' : 'bg-[#0d68f2]'}
          ${isOpen
            ? "max-h-150 opacity-100 py-8 visible"
            : "max-h-0 opacity-0 py-0 invisible"}
        `}
      >
        <nav className="flex flex-col space-y-6 px-6">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              onClick={() => setIsOpen(false)}
              className={`text-xl ${getLinkStyle(link.href)}`}
            >
              {link.name}
            </Link>
          ))}

          <hr className={useGrayStyle ? "border-gray-300" : "border-blue-400"} />

          <div className="flex flex-col space-y-4">

            <button
              onClick={() => setIsModalOpen(true)}
              className={`w-full py-3 rounded-lg font-bold border ${
                !useGrayStyle
                  ? 'text-white border-white'
                  : 'text-blue-600 border-blue-600'
              }`}
            >
              Apply to Colleges
            </button>

            <Link
              href="/contact"
              onClick={() => setIsOpen(false)}
              className={`w-full py-3 text-center rounded-lg font-bold ${
                !useGrayStyle
                  ? 'bg-white text-[#0d68f2]'
                  : 'bg-blue-600 text-white'
              }`}
            >
              Talk to Expert
            </Link>
          </div>
        </nav>
      </div>

      {/* Modal */}
      <EnquiryFormModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        sourcePage="Header - Apply to Colleges"
      />
    </header>
  );
}
