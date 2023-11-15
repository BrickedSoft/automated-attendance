import theme from '../../../../tailwind.config'
import { useLocation } from 'react-router-dom'
import { FC, ReactNode } from 'react'
import { sideBarItems } from '@renderer/assets/data/sidebar'

const SideBar = () => {
  const { pathname } = useLocation()

  type NavItemProps = {
    title: string
    href: string
    icon: ReactNode
  }

  const NavItem: FC<NavItemProps> = ({ title, href, icon }) => {
    return (
      <li >
        <a
          href={href}
          className={`relative flex flex-row items-center h-11 focus:outline-non text-gray-600 hover:text-gray-800 border-l-4 border-transparent pr-6 ${
            href.substring(1) == pathname.substring(1)
              ? ' border-indigo-500 bg-sky-50'
              : 'hover:bg-gray-100'
          }`}
        >
          <span className="inline-flex justify-center items-center ml-4">{icon}</span>
          <span className="ml-2 text-sm tracking-wide truncate">{title}</span>
        </a>
      </li>
    )
  }

  return (
    <div
      className="fixed flex flex-col top-0 left-0 w-64 bg-white h-full border-r"
      style={{ marginTop: theme.theme.extend.height.header }}
    >
      <div className="overflow-y-auto overflow-x-hidden flex-grow">
        <ul className="flex flex-col py-4 space-y-1">
          {sideBarItems.map(({ title, href, icon }, index) => (
            <NavItem title={title} href={href} key={index} icon={icon} />
          ))}
        </ul>
      </div>
    </div>
  )
}

export default SideBar
