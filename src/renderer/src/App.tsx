import UserProvider from './context/UserContext'
import ImageProvider from './context/ImageContext'
import AppWithContext from './AppWithContext'
import MatcherProvider from './context/MatcherContext'

const App = (): JSX.Element => {
  return (
    <UserProvider>
      <ImageProvider>
        <MatcherProvider>
          <AppWithContext />
        </MatcherProvider>
      </ImageProvider>
    </UserProvider>
  )
}

export default App
