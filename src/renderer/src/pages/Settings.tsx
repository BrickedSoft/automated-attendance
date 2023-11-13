import ImageView from '@renderer/components/ImageView'
import ImageSelect from '@renderer/components/UserForm'

const Settings = () => {
  return (
    <div className="w-full px-5 py-9">
      <ImageSelect />
      {/* Testing codes */}
      <ImageView />
    </div>
  )
}

export default Settings
