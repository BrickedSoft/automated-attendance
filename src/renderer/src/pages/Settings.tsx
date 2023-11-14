import SettingsBanner from '@renderer/components/SettingsBanner'
import UserForm from '@renderer/components/UserForm'
import UserList from '@renderer/components/UserList'

const Settings = () => {
  return (
    <div className="w-full flex flex-col gap-12 px-16 pb-9 overflow-hidden">
      <SettingsBanner />
      <UserForm />
      <UserList />
    </div>
  )
}

export default Settings
