import React from 'react';
import { Menu } from './menu/menu.jsx'
import { Footer } from './footer/footer.jsx'
import { Main } from './main/main.jsx'
import { Game } from './game/game.jsx'
import './App.css'
import { BrowserRouter, Routes, Route} from 'react-router-dom';

function App() {

  return (
    <BrowserRouter>
      <Menu />
      <Routes>
        <Route path='/' element={<Main />} />
        <Route path='/game/*' element={<Game />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  )
}

export default App
