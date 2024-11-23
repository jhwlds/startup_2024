import { Routes, Route} from 'react-router-dom';
import React from 'react';
import { Play } from './play/play.jsx'
import { Login } from './login/login.jsx'

export function Game() {

    return (
          <>
          <Routes>
            <Route path='/' element={<Login />} />
            <Route path='play' element={<Play />} />
          </Routes>
          </>
    );
}