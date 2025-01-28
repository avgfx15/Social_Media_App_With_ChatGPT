import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className='bg-gray-800 text-white py-4 w-full'>
      <div className='container mx-auto flex justify-between items-center'>
        <div className='text-sm'>
          &copy; {new Date().getFullYear()} Your Company Name. All rights
          reserved.
        </div>
        <div className='flex space-x-4 text-sm'>
          <Link
            to='/privacy-policy'
            className='hover:underline hover:text-gray-400'
          >
            Privacy Policy
          </Link>
          <Link
            to='/terms-of-service'
            className='hover:underline hover:text-gray-400'
          >
            Terms of Service
          </Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
