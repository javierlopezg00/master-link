
import { useState } from 'react';
import './App.css';
import Header from './Components/Header';
import AppRouter from './Router/AppRouter';

function App() {

  

  return (
    <div className="App">
        <Header/>
        <AppRouter/>
    </div>
  );
}

export default App;
