import React from 'react';
import { Menu } from './menu/menu.jsx';
import { Footer } from './footer/footer.jsx';
import { Main } from './main/main.jsx';
import { Game } from './game/game.jsx';
import './App.css';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
      <Content />
    </BrowserRouter>
  );
}

function Content() {
  const location = useLocation();

  // "/game/play" 경로인지 확인
  const isPlayPath = location.pathname === '/game/play';

  return (
    <>
      <Menu isPlay={isPlayPath} />
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/game/*" element={<Game />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;