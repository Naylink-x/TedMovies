import React, { useState } from 'react';
import LandingPage from './LandingPage';

function App() {
  const [moviesData, setMoviesData] = useState([]);

  return (
    <div className='app'>
      <h1>TED Movies App</h1>
      <LandingPage
        moviesData={moviesData}
        setMoviesData={setMoviesData} />
    </div>
  );
}

export default App;
