import { HashRouter, Route, Routes } from 'react-router-dom'

import { nav } from './assets/data/routes'
import Header from './components/Header'
import Settings from './pages/Settings'
import VideoFrame from './pages/VideoFrame'
import UserProvider from './context/UserContext'

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
                <Settings />
              </UserProvider>
            }
          />
        </Routes>
      </HashRouter>
    </div>
  )
}

export default App
