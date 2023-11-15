import { FC, ReactNode, useState } from 'react'

import { controlItems } from '@renderer/assets/data/header'
import Logo from '../assets/img/logo.png'

type ControlItemProps = {
  icon: ReactNode
  color?: string
  bg?: string
  onClick: () => void
}

const ControlItem: FC<ControlItemProps> = ({ icon, color, bg, onClick }) => {
  const [isHover, setIsHover] = useState(false)
  return (
    <li
      className={`w-9 h-full flex items-center justify-center text-light-black-33 uppercase font-medium text-sm transition`}
      style={{
        backgroundColor: isHover ? bg : 'transparent',
        color: isHover ? color : 'inherit'
      }}
      onClick={onClick}
      onMouseEnter={() => setIsHover(true)}
      onMouseLeave={() => setIsHover(false)}
    >
      {icon}
    </li>
  )
}

// TODO: border-b-light-gray-f9 border-b-[1.8px]

const Header = () => {
  return (
    <>
      <div className="fixed z-50 bg-white w-screen h-header pl-3 grid grid-cols-[auto_1fr_auto] items-center justify-center">
        <img src={Logo} className="h-5 w-auto py-0.5" />

        <div className="draggable w-full h-full"></div>

        <ul className="list-none h-full flex justify-end items-center">
          {controlItems.map(({ icon, color, bg, onClick }, index) => (
            <ControlItem icon={icon} onClick={onClick} color={color} bg={bg} key={index} />
          ))}
        </ul>
      </div>

      <div className="w-screen h-header "></div>
    </>
  )
}

export default Header
