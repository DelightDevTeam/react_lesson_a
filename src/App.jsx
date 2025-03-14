import React from 'react';
import Search from './components/Search';
import { useEffect, useState } from 'react';
import Spinner from './components/Spinner';
import MovieCard from './components/MovieCard';

const API_BASE_URL = 'https://api.themoviedb.org/3';
const API_KEY = import.meta.env.VITE_TMDB_API_KEY;

const API_OPTIONS = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: `Bearer ${API_KEY}`,
  },
};
const App = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [movieList, setMovieList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const fetchMovies = async () => {
    setIsLoading(true);
    setErrorMessage('');
    try {
      const endpoint = `${API_BASE_URL}/discover/movie?soft_by=popularity.desc`;
      const response = await fetch(endpoint, API_OPTIONS);
      //alert(response);
      if (!response.ok) {
        throw new Error('Failed to fetch movies');
      }
      const data = await response.json();
      console.log(data);
      if (data.Respond === 'False') {
        setErrorMessage(data.Error || 'Error fetching movies');
        setMovieList([]);
        return;
      }
      setMovieList(data.results || []);
      setErrorMessage('');
    } catch (error) {
      console.error(`Error Fetching Movies: ${error}`);
      setErrorMessage('Error fetching movies. Try again later.');
    } finally {
      setIsLoading(false);
    }
  };
  useEffect(() => {
    fetchMovies();
  }, [searchTerm]);
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
        <section className='all-movies'>
          <h1 className='mt-[40px]'>All Movies</h1>
          {isLoading ? (
            <Spinner />
          ) : errorMessage ? (
            <p>{errorMessage}</p>
          ) : (
            <ul>
              {movieList.map((movie) => (
                <MovieCard key={movie.id} movie={movie} />
              ))}
            </ul>
          )}
        </section>
      </div>
    </main>
  );
};

export default App;
