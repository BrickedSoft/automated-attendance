import { useState } from 'react'
import UserForm from './UserForm'
import File from './File'

const Nav = (): JSX.Element => {
  const [currentView, setCurrentView] = useState<string>('FILE')

  return (
    <>
      <div className="w-full absolute z-10">
        <div className="inline-flex">
          <button
            className="bg-gray-300 hover:bg-gray-400 text-gray-800 py-2 px-4 rounded-l bg-opacity-40"
            onClick={() => setCurrentView('FRAME')}
          >
            UserForm
          </button>
          <button
            className="bg-gray-300 hover:bg-gray-400 text-gray-800 py-2 px-4 rounded-r bg-opacity-40"
            onClick={() => setCurrentView('FILE')}
          >
            File
          </button>
        </div>
      </div>
      {currentView == 'FRAME' ? <UserForm /> : <File />}
    </>
  )
}

export default Nav
