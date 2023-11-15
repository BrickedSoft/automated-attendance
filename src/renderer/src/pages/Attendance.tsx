import UserList from '@renderer/components/UserList'
import theme from '../../../../tailwind.config'

const Attendance = () => {
  return (
    <div
      className="flex flex-col gap-12 px-16 pb-9 overflow-hidden"
      style={{
        marginLeft: theme.theme.extend.width.sidebar
      }}
    >
    </div>
  )
}

export default Attendance
