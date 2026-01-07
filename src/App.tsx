import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Welcome } from './pages/Welcome';
import { About } from './pages/About';
import { Stories } from './pages/Stories';
import { Services } from './pages/Services';
import { Contact } from './pages/Contact';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Welcome />} />
        <Route path="/about" element={<About />} />
        <Route path="/stories" element={<Stories />} />
        <Route path="/services" element={<Services />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
    </Router>
  )
}

export default App
