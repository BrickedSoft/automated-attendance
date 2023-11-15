import { FC, ReactNode } from 'react'

import { controlItems, navItems } from '@renderer/assets/data/header'
import Logo from '../assets/img/logo.png'

type NavItemProps = {
  title: string
  href: string
}

type ControlItemProps = {
  icon: ReactNode
  color?: string
  onClick: () => void
}

const NavItem: FC<NavItemProps> = ({ title, href }) => {
  return (
    <a
      className="text-light-black-33 hover:text-light-blue-ff uppercase font-medium text-sm transition"
      href={href}
    >
      {title}
    </a>
  )
}

const ControlItem: FC<ControlItemProps> = ({ icon, color, onClick }) => {
  return (
    <li
      className={`text-light-black-33 hover:text-${color} uppercase font-medium text-sm transition`}
      onClick={onClick}
    >
      {icon}
    </li>
  )
}

// TODO: border-b-light-gray-f9 border-b-[1.8px]

const Header = () => {
  return (
    <>
      <div className="fixed z-50 bg-white w-screen h-header px-3 py-0.5 grid grid-cols-[auto_1fr_auto_1fr_auto] items-center justify-center shadow-sm">
        <img src={Logo} className="h-6 w-auto" />

        <div className="draggable w-full h-full"></div>

        {/* <ul className="list-none flex justify-center items-center gap-6">
          {navItems.map(({ title, href }, index) => (
            <NavItem title={title} href={href} key={index} />
          ))}
        </ul> */}

        <div className="draggable w-full h-full"></div>

        <ul className="list-none flex justify-end items-center gap-6">
          {controlItems.map(({ icon, color, onClick }, index) => (
            <ControlItem icon={icon} onClick={onClick} color={color} key={index} />
          ))}
        </ul>
      </div>

      <div className="w-screen h-header "></div>
    </>
  )
}

export default Header
