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
    icon: <TbMinus size={18} strokeWidth={3} />,
    href: '/remove'
  },
  {
    icon: <TbMaximize size={16} strokeWidth={3} />,
    href: '/remove'
  },
  {
    icon: <TbX size={18} strokeWidth={3} />,
    href: '/close'
  }
]
