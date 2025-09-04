'use client'

import React from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import Logo from '../common/Logo'
import { WalletButton } from '../solana/solana-provider'

/**
 * Header component with navigation
 */
const Header: React.FC = () => {
  const pathname = usePathname()
  const isActive = (path: string) => pathname === path

  return (
    <header className="bg-white border-b-3 border-base sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <div className="flex items-center">
          <Link href="/">
            <Logo />
          </Link>
        </div>
        <nav className="hidden md:block">
          <ul className="flex items-center gap-4">
            <li>
              <Link 
                href="/" 
                className={`font-bold text-base transition-colors px-3 py-2 ${
                  isActive('/') ? 'text-primary' : 'text-base'
                }`}
              >
                Home
              </Link>
            </li>
            <li>
              <Link 
                href="/dashboard" 
                className={`font-bold text-base transition-colors px-3 py-2 ${
                  isActive('/dashboard') ? 'text-primary' : 'text-base'
                }`}
              >
                Dashboard
              </Link>
            </li>
            <li>
              <WalletButton />
            </li>
          </ul>
        </nav>

        {/* Mobile Menu Button */}
        <button className="md:hidden btn btn-primary py-2 px-3">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      </div>
    </header>
  )
}

export default Header