import React from 'react';

import RoutesComponent from './Components/RoutesComponent';
import Navbar from './Components/Navbar';

const App = () => {
  return (
    <div className=''>
      <div className=''>
        <Navbar />
        <div>
          <RoutesComponent />
        </div>
      </div>
    </div>
  );
};

export default App;
