import { FC, ReactNode } from 'react'

import { controlItems } from '@renderer/assets/data/header'
import Logo from '../assets/img/logo.png'

type NavItemProps = {
  title: string
  href: string
}

type ControlItemProps = {
  icon: ReactNode
  onClick: () => void
}

const NavItem: FC<NavItemProps> = ({ title, href }) => {
  return (
    <a className="text-light-black-33 uppercase font-medium text-sm" href={href}>
      {title}
    </a>
  )
}

const ControlItem: FC<ControlItemProps> = ({ icon, onClick }) => {
  return (
    <li className="text-light-black-33 uppercase font-medium text-sm" onClick={onClick}>
      {icon}
    </li>
  )
}

// TODO: border-b-light-gray-f9 border-b-[1.8px]

const Header = () => {
  return (
    <div className="w-full h-header py-0.5 grid grid-cols-[auto_1fr_auto_1fr_auto] items-center justify-center px-5">
      <img src={Logo} className="h-6 w-auto" />

      <div className="draggable w-full h-full"></div>

      {/* ----------------------------------- Mid ---------------------------------- */}

      <div className="draggable w-full h-full"></div>
      {/* <ul className="list-none flex justify-center items-center gap-6">
          {navItems.map(({ title, href }, index) => (
            <NavItem title={title} href={href} key={index} />
          ))}
        </ul> */}

      <div className="draggable w-full h-full"></div>

      <ul className="list-none flex justify-end items-center gap-6">
        {controlItems.map(({ icon, onClick }, index) => (
          <ControlItem icon={icon} onClick={onClick} key={index} />
        ))}
      </ul>
    </div>
  )
}

export default Header
