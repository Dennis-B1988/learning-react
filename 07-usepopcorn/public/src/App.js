import { useEffect, useState } from 'react';
import { Box } from './components/main/Box';
import { Main } from './components/main/Main';
// import { Movie } from './components/main/Movie';
import { ErrorMessage } from './components/main/ErrorMessage';
import { Loader } from './components/main/Loader';
import { MovieDetails } from './components/main/MovieDetails';
import { MovieList } from './components/main/MovieList';
import { WatchedMoviesList } from './components/main/WatchedMoviesList';
import { WatchedSummary } from './components/main/WatchedSummary';
import { Navigation } from './components/navigation/Navigation';
import { NumResults } from './components/navigation/NumResults';
import { Search } from './components/navigation/Search';

const KEY = '75bd4290';

export default function App() {
  const [query, setQuery] = useState('');
  const [movies, setMovies] = useState([]);
  const [watched, setWatched] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [selectedId, setSelectedId] = useState(null);

  function handleSelectMovie(id) {
    setSelectedId((selectedId) => (id === selectedId ? null : id));
  }

  function handleCloseMovie() {
    setSelectedId(null);
  }

  function handleAddWatched(movie) {
    setWatched((watched) => [...watched, movie]);
  }

  function handleDeleteWatched(id) {
    setWatched((watched) => watched.filter((movie) => movie.imdbID !== id));
  }

  useEffect(() => {
    const controller = new AbortController();

    async function fetchMovies() {
      try {
        setIsLoading(true);
        setError('');
        const res = await fetch(`http://www.omdbapi.com/?i=tt3896198&apikey=${KEY}&s=${query}`, { signal: controller.signal });

        if (!res.ok) throw new Error('Something went wrong with fetching movies');

        const data = await res.json();
        if (data.Response === 'False') throw new Error('Movie not found');

        setMovies(data.Search);
      } catch (err) {
        if (err) {
          if (err.name !== 'AbortError') {
            setError(err.message);
          }
        }
      } finally {
        setIsLoading(false);
      }
    }
    if (query.length < 3) {
      setMovies([]);
      setError('');
      return;
    }
    handleCloseMovie();
    fetchMovies();

    return function cleanup() {
      controller.abort();
    };
  }, [query]);

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
