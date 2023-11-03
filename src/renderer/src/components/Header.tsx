import { FC, ReactNode } from 'react'

import { controlItems, navItems } from '@renderer/assets/data/header'
import Logo from '../assets/img/logo.png'

type NavItemProps = {
  title: string
  href: string
}

type ControlItemProps = {
  icon: ReactNode
  href: string
}

const NavItem: FC<NavItemProps> = ({ title, href }) => {
  return (
    <a className="text-light-black-33 uppercase font-medium text-sm" href={href}>
      {title}
    </a>
  )
}

const ControlItem: FC<ControlItemProps> = ({ icon }) => {
  return <li className="text-light-black-33 uppercase font-medium text-sm">{icon}</li>
}

const Header = () => {
  return (
    <div className="header w-full h-header">
      <div className="h-full grid grid-cols-3 items-center justify-center px-5">
        <img src={Logo} className="h-8 w-auto" />

        <ul className="list-none flex justify-center items-center gap-6">
          {navItems.map(({ title, href }, index) => (
            <NavItem title={title} href={href} key={index} />
          ))}
        </ul>

        <ul className="list-none flex justify-end items-center gap-6">
          {controlItems.map(({ icon, href }, index) => (
            <ControlItem icon={icon} href={href} key={index} />
          ))}
        </ul>
      </div>
      <hr className="border-light-gray-f9 border-[1.2px]" />
    </div>
  )
}

export default Header
