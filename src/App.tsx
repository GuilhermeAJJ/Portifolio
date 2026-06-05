import { Routes, Route, useLocation } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'
import { CRTScreen } from './components/CRTScreen'
import { MainMenu } from './components/MainMenu'
import { About } from './sections/About'
import { Resume } from './sections/Resume'
import { Projects } from './sections/Projects/Projects'
import { Achievements } from './sections/Achievements'

export default function App() {
  const location = useLocation()
  return (
    <CRTScreen>
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<MainMenu />} />
          <Route path="/sobre" element={<About />} />
          <Route path="/curriculo" element={<Resume />} />
          <Route path="/projetos" element={<Projects />} />
          <Route path="/conquistas" element={<Achievements />} />
          <Route path="*" element={<MainMenu />} />
        </Routes>
      </AnimatePresence>
    </CRTScreen>
  )
}
