import { SyntheticEvent, useState } from 'react'

import { data } from '@renderer/assets/data/settings'
import SettingsBanner from '@renderer/components/Banner'
import UserForm from '@renderer/components/UserForm'
import UserList from '@renderer/components/UserList'

const Settings = () => {
  const [isScrollTop, setIsScrollTop] = useState(true)

  return (
    <div
      className="relative flex flex-col gap-12 px-16 overflow-y-scroll h-full w-full"
      onScroll={(e: SyntheticEvent) => {
        const target = e.target as HTMLTextAreaElement
        setIsScrollTop(target.scrollTop === 0)
      }}
    >
      <SettingsBanner name={data.name} isScrollTop={isScrollTop} />

      <div className={`flex flex-col gap-12 ${!isScrollTop && 'pt-20'}`}>
        <UserForm />
        <UserList />
      </div>
    </div>
  )
}

export default Settings
