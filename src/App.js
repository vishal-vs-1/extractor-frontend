//app.js
import './App.css';
import Navbar from './components/Navbar';
import { BrowserRouter as Router } from 'react-router-dom';
import UploadLogic from './components/UploadLogic';
import { useEffect, useState } from 'react';

function App() {

  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    if (darkMode) {
      document.body.classList.remove('light-mode');
      document.body.classList.add('dark-mode');
    } else {
      document.body.classList.remove('dark-mode');
      document.body.classList.add('light-mode');
    }
  }, [darkMode]);

  return (
    <>
      <Router>
        <Navbar darkMode = {darkMode} setDarkMode = {setDarkMode}/>
        <UploadLogic darkMode = {darkMode} />
      </Router>
    </>
  );
}

export default App;
