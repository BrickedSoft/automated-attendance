import { data } from '@renderer/assets/data/settings'
import SettingsBanner from '@renderer/components/Banner'
import UserForm from '@renderer/components/UserForm'
import UserList from '@renderer/components/UserList'
import theme from '../../../../tailwind.config'

const Settings = () => {
  return (
    <div
      className="flex flex-col h-full gap-12 px-16"
      style={{
        marginLeft: theme.theme.extend.width.sidebar
      }}
    >
      <SettingsBanner name={data.name} />
      <UserForm />
      <UserList />
    </div>
  )
}

export default Settings
