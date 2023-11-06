import { TbMaximize, TbMinimize, TbX, TbMinus } from 'react-icons/tb'

export const navItems = [
  {
    title: 'Home',
    href: '/'
  },
  {
    title: 'Settings',
    href: '/settings'
  }
]

export const controlItems = [
  {
    icon: <TbMinus size={20} strokeWidth={2} />,
    onClick: () => window.api.minimizeWindow()
  },
  {
    icon: <TbMaximize size={16} strokeWidth={2} />,
    onClick: () => window.api.toggleWindow()
  },
  {
    icon: <TbX size={20} strokeWidth={2} />,
    onClick: () => window.api.closeWindow()
  }
]
