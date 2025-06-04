import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useState } from 'react'

import Header from './Components/Header';
import Footer from './Components/Footer';

import Inicio from './Pages/Inicio';
import List from './Pages/List';
import Climate from './Pages/Climate';

function App() {
  const [count, setCount] = useState(0)

  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Inicio />} />
        <Route path="/list" element={<List />} />
        <Route path="/climate" element={<Climate />} />
      </Routes>
      <Footer />
    </Router>
  )
}

export default App
