import React from 'react'
import Link from 'next/link'

interface NavLinkProps {
  href: string;
  children: React.ReactNode;
  isActive?: boolean;
}

const NavLink: React.FC<NavLinkProps> = ({ href, children, isActive = false }) => {
  const activeClass = isActive ? 'text-primary' : 'text-base'

  return (
    <Link href={href} className={`font-bold text-base ${activeClass} transition-colors px-3 py-2`}>
      {children}
    </Link>
  )
}

export default NavLink