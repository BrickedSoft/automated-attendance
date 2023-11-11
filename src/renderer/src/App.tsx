import { HashRouter, Route, Routes } from 'react-router-dom'

import { nav } from './assets/data/routes'
import Header from './components/Header'
import Settings from './pages/Settings'
import VideoFrame from './pages/VideoFrame'
import Nav from './components/Nav'

const App = (): JSX.Element => {
  return (
    <div className="w-full">
      <Header />
      <HashRouter>
        <Routes>
          <Route index element={<VideoFrame />} />
          <Route path={nav.settings} element={<Settings />} />
        </Routes>
      </HashRouter>
      <Nav />
    </div>
  )
}

export default App
