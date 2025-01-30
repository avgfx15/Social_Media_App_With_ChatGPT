import React, { useEffect } from 'react';

import RoutesComponent from './Components/RoutesComponent';
import Navbar from './Components/Navbar';
import { useDispatch } from 'react-redux';
import { getAllPosts } from './features/Post/PostAction';

import Footer from './Components/Footer';

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllPosts());
  }, [dispatch]);
  return (
    <div className='h-screen'>
      <Navbar />

      <RoutesComponent />

      <Footer />
    </div>
  );
};

export default App;
