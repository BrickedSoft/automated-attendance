import UserProvider from './context/UserContext'
import ImageProvider from './context/ImageContex'
import AppWithContext from './AppWithContex'

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
