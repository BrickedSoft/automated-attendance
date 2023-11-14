import { TbMaximize, TbX, TbMinus } from 'react-icons/tb'
import { routes } from './routes'

export const navItems = [
  {
    title: 'Home',
    href: routes.home
  },
  {
    title: 'Settings',
    href: routes.settings
  }
]

export const controlItems = [
  {
    icon: <TbMinus size={20} strokeWidth={2} />,
    onClick: () => window.api.minimizeWindow(),
    color: 'light-blue-ff'
  },
  {
    icon: <TbMaximize size={16} strokeWidth={2} />,
    onClick: () => window.api.toggleWindow(),
    color: 'light-blue-ff'
  },
  {
    icon: <TbX size={20} strokeWidth={2} />,
    onClick: () => window.api.closeWindow(),
    color: 'red-500'
  }
]
