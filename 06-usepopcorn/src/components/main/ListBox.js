import { useState } from 'react';
import { Button } from './Button';
import { MovieList } from './MovieList';

export function ListBox({ tempMovieData, movies }) {
  const [isOpen1, setIsOpen1] = useState(true);

  return (
    <div className="box">
      <Button
        isOpen={isOpen1}
        setIsOpen={setIsOpen1}
      />
      {isOpen1 && <MovieList movies={movies} />}
    </div>
  );
}
