import { HashRouter, Route, Routes } from 'react-router-dom'

import { nav } from './assets/data/routes'
import Header from './components/Header'
import Settings from './pages/Settings'
import VideoFrame from './pages/VideoFrame'
import UserProvider from './context/UserContext'
import ImageProvider from './context/ImageContex'
const App = (): JSX.Element => {
  return (
    <div className="w-full">
      <Header />
      <HashRouter>
        <Routes>
          <Route
            index
            element={
              <UserProvider>
                <VideoFrame />
              </UserProvider>
            }
          />
          <Route
            path={nav.settings}
            element={
              <UserProvider>
                <ImageProvider>
                  <Settings />
                </ImageProvider>
              </UserProvider>
            }
          />
        </Routes>
      </HashRouter>
    </div>
  )
}

export default App
