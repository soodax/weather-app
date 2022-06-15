import './App.scss';
import './nullstyle.scss';
import Main from './components/Main/Main';
import { useState } from 'react';

function App() {

  const [darkMode, changeMode] = useState(false);

  return (
    <div className={!darkMode ? 'app-color-white' : 'app-color-dark'}>
      <div className='wrapper'>
        <Main darkMode={darkMode} changeMode={changeMode}/>
      </div>
    </div>
  );
}

export default App;
