import UserProvider from './context/UserContext'
import ImageProvider from './context/ImageContext'
import AppWithContext from './AppWithContext'

const App = (): JSX.Element => {
  return (
    <UserProvider>
      <ImageProvider>
        <AppWithContext />
      </ImageProvider>
    </UserProvider>
  )
}

export default App
