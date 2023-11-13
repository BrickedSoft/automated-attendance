import UserForm from '@renderer/components/UserForm'
import UserList from '@renderer/components/UserList'

const Settings = () => {
  return (
    <div className="w-full flex flex-col gap-12 px-16 py-9 overflow-hidden">
      <UserForm />
      {/* Testing codes */}
      {/* <ImageView /> */}
      <UserList />
    </div>
  )
}

export default Settings
