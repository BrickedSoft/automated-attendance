import SettingsBanner from '@renderer/components/SettingsBanner'
import UserForm from '@renderer/components/UserForm'
import UserList from '@renderer/components/UserList'
import theme from '../../../../tailwind.config'

const Settings = () => {
  return (
    <div
      className="flex flex-col gap-12 px-16 pb-9 overflow-hidden"
      style={{
        marginLeft: theme.theme.extend.width.sidebar
      }}
    >
      <SettingsBanner />
      <UserForm />
      <UserList />
    </div>
  )
}

export default Settings
