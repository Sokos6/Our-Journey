import React from 'react';
import '../styles/App.css';
import { Link } from 'react-router-dom';

function Header() {
  return (
    <nav className='Nav'>
      <div className='Nav-menus'>
        <div className='Nav-brand'>
          <Link to='/'>
            Our Journey
          </Link>
        </div>
      </div>
    </nav>
  );
}

export default Header;
