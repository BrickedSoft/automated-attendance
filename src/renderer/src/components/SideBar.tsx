import { FC, ReactNode, useState } from 'react'
import { IoChevronBackOutline } from 'react-icons/io5'
import { useLocation } from 'react-router-dom'

import { sideBarItems } from '@renderer/assets/data/sidebar'
import theme from '../../../../tailwind.config'
import { AnimatePresence, motion } from 'framer-motion'

const SideBar = () => {
  const { pathname } = useLocation()
  const [isMinimized, setIsMinimized] = useState(false)

  type NavItemProps = {
    title: string
    href: string
    icon: ReactNode
  }

  const NavItem: FC<NavItemProps> = ({ title, href, icon }) => {
    return (
      <a
        href={href}
        className={`flex gap-4 items-center ${
          isMinimized ? 'justify-center rounded-full h-12 w-12' : 'rounded-lg px-6 py-4'
        } outline-none text-gray-600 hover:text-gray-800 ${
          href.substring(1) == pathname.substring(1)
            ? ' border-indigo-500 bg-light-blue-ff/10 !text-light-blue-ff'
            : 'hover:bg-gray-100'
        } transition-all duration-300`}
      >
        <motion.span className="inline-flex justify-center items-center" layout="position">
          {icon}
        </motion.span>
        {!isMinimized && (
          <motion.span className="text-sm tracking-wide truncate" layout>
            {title}
          </motion.span>
        )}
      </a>
    )
  }

  return (
    <AnimatePresence initial={false}>
      <motion.div
        className={`fixed flex-col ${
          isMinimized ? 'w-sidebar-sm justify-center px-2' : 'w-sidebar px-6'
        } bg-white shadow-[4px_36px_36px_rgba(28,126,214,0.1)] py-9 overflow-hidden z-50`}
        style={{
          height: `calc(100vh - ${theme.theme.extend.height.header})`
        }}
        layout
        transition={{
          layout: {
            duration: 0.5,
            type: 'spring'
          }
        }}
      >
        <div className={`flex ${isMinimized ? 'justify-center' : 'justify-end'}`}>
          <motion.div
            className="inline-flex justify-center items-center cursor-pointer text-2xl text-gray-400 hover:text-light-blue-ff hover:scale-110 transition duration-300"
            onClick={() => {
              setIsMinimized(!isMinimized)
            }}
            layout
            animate={{ rotate: isMinimized ? 0 : 180 }}
            transition={{ duration: 0.5, type: 'spring' }}
          >
            <IoChevronBackOutline />
          </motion.div>
        </div>
        <div className="h-full overflow-y-auto overflow-x-hidden flex-grow">
          <ul
            className={`h-full flex flex-col ${
              isMinimized ? 'items-center' : ' items-stretch'
            } py-8 gap-3 list-none`}
          >
            {sideBarItems.map(({ title, href, icon }, index) => (
              <NavItem title={title} href={href} key={index} icon={icon} />
            ))}
          </ul>
        </div>
      </motion.div>
    </AnimatePresence>
  )
}

export default SideBar
