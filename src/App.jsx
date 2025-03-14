import React from 'react';
import Search from './components/Search';
import { useState } from 'react';

const App = () => {
  const [searchTerm, setSearchTerm] = useState('');
  return (
    <main>
      <div className='pattern' />
      <div className='wrapper'>
        <header>
          <img src='./hero.png' alt='Hero Banner' />
          <h1>
            Find <span className='text-gradient'>Movies</span> you'll Enjoy
            Without the Hassle
          </h1>
          <Search searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
          <h1 className='text-white'>
            {searchTerm ? `Results for "${searchTerm}"` : 'Popular Movies'}
          </h1>
          <p className='text-white'>
            Discover new films, TV shows, and more by entering your favorite
            keywords. Or use our pre-populated suggestions.
          </p>
        </header>
      </div>
    </main>
  );
};

export default App;
