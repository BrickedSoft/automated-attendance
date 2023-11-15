import { FC, ReactNode } from 'react'
import { useLocation } from 'react-router-dom'

import { sideBarItems } from '@renderer/assets/data/sidebar'
import theme from '../../../../tailwind.config'

const SideBar = () => {
  const { pathname } = useLocation()

  type NavItemProps = {
    title: string
    href: string
    icon: ReactNode
  }

  const NavItem: FC<NavItemProps> = ({ title, href, icon }) => {
    return (
      <a
        href={href}
        className={`flex gap-4 items-center px-6 py-4 rounded-lg outline-none text-gray-600 hover:text-gray-800 ${
          href.substring(1) == pathname.substring(1)
            ? ' border-indigo-500 bg-light-blue-ff/10'
            : 'hover:bg-gray-100'
        } transition-all duration-300`}
      >
        <span className="inline-flex justify-center items-center">{icon}</span>
        <span className="text-sm tracking-wide truncate">{title}</span>
      </a>
    )
  }

  return (
    <div
      className="fixed flex-col w-sidebar bg-white shadow-[36px_0_36px_rgba(28,126,214,0.04)] px-6 py-9 overflow-hidden z-50"
      style={{
        height: `calc(100vh - ${theme.theme.extend.height.header})`
      }}
    >
      <div className="h-full overflow-y-auto overflow-x-hidden flex-grow">
        <ul className="h-full flex flex-col py-4 gap-3 list-none items-stretch">
          {sideBarItems.map(({ title, href, icon }, index) => (
            <NavItem title={title} href={href} key={index} icon={icon} />
          ))}
        </ul>
      </div>
    </div>
  )
}

export default SideBar
