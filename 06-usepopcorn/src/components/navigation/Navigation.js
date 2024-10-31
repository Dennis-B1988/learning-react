import { useState } from 'react';
import { AmountOfMoviesWatched } from './AmountOfMoviesWatched';
import { Logo } from './Logo';
import { Search } from './Search';

export function Navigation({ movies }) {
  const [query, setQuery] = useState('');

  return (
    <nav className="nav-bar">
      <Logo />
      <Search
        query={query}
        setQuery={setQuery}
      />
      <AmountOfMoviesWatched movies={movies} />
    </nav>
  );
}
