import { useEffect, useState } from 'react';
import { Box } from './components/main/Box';
import { ErrorMessage } from './components/main/ErrorMessage';
import { Loader } from './components/main/Loader';
import { Main } from './components/main/Main';
import { MovieDetails } from './components/main/MovieDetails';
import { MovieList } from './components/main/MovieList';
import { WatchedMoviesList } from './components/main/WatchedMoviesList';
import { WatchedSummary } from './components/main/WatchedSummary';
import { Navigation } from './components/navigation/Navigation';
import { NumResults } from './components/navigation/NumResults';
import { Search } from './components/navigation/Search';
import useLocalStorageState from './hooks/useLocalStorageState';
import useMovies from './hooks/useMovies';

const KEY = '75bd4290';

export default function App() {
  const [query, setQuery] = useState('');
  const [selectedId, setSelectedId] = useState(null);
  const { movies, isLoading, error } = useMovies(query);
  const [watched, setWatched] = useLocalStorageState([], 'watched');

  function handleSelectMovie(id) {
    setSelectedId((selectedId) => (id === selectedId ? null : id));
  }

  function handleCloseMovie() {
    setSelectedId(null);
  }

  function handleAddWatched(movie) {
    setWatched((watched) => [...watched, movie]);

    // localStorage.setItem('watched', JSON.stringify([...watched, movie]));
  }

  function handleDeleteWatched(id) {
    setWatched((watched) => watched.filter((movie) => movie.imdbID !== id));
  }

  return (
    <>
      <Navigation>
        <Search
          query={query}
          setQuery={setQuery}
        />
        <NumResults movies={movies} />
      </Navigation>

      <Main>
        <Box>
          {isLoading && <Loader />}
          {!isLoading && !error && (
            <MovieList
              movies={movies}
              onSelectMovie={handleSelectMovie}
            />
          )}
          {error && <ErrorMessage message={error} />}
        </Box>

        <Box>
          {selectedId ? (
            <MovieDetails
              selectedId={selectedId}
              onCloseMovie={handleCloseMovie}
              onAddWatched={handleAddWatched}
              watched={watched}
              KEY={KEY}
            />
          ) : (
            <>
              <WatchedSummary watched={watched} />
              <WatchedMoviesList
                watched={watched}
                onDeleteWatched={handleDeleteWatched}
              />
            </>
          )}
        </Box>
      </Main>
    </>
  );
}
