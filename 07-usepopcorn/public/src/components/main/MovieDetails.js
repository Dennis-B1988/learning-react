import { useEffect, useState } from 'react';
import { Loader } from './Loader';
import { StarRating } from './StarRating';

export function MovieDetails({ selectedId, onCloseMovie, onAddWatched, watched, KEY }) {
  const [movie, setMovie] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [userRating, setUserRating] = useState('');

  const isWatched = watched.map((movie) => movie.imdbID).includes(selectedId);
  const watchedUserRating = watched.find((movie) => movie.imdbID === selectedId)?.userRating;

  const {
    Title: title,
    Poster: poster,
    Runtime: runtime,
    imdbRating,
    Plot: plot,
    Released: released,
    Actors: actors,
    Director: director,
    Genre: genre,
  } = movie || {};

  function handleAdd() {
    const newWatchedMovie = {
      imdbID: selectedId,
      title,
      poster,
      imdbRating: Number(imdbRating),
      runtime: Number(runtime.split(' ').at(0)),
      userRating,
    };
    onAddWatched(newWatchedMovie);
    onCloseMovie();
  }

  useEffect(() => {
    async function getMovieDetails() {
      setIsLoading(true);
      const res = await fetch(`http://www.omdbapi.com/?apikey=${KEY}&i=${selectedId}`);
      const data = await res.json();
      setMovie(data);
      setIsLoading(false);
    }
    getMovieDetails();
  }, [KEY, selectedId]);

  useEffect(() => {
    if (!title) return;
    document.title = `Movie | ${title}`;
    return function cleanup() {
      document.title = 'usePopcorn';
    };
  }, [title]);

  useEffect(() => {
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        onCloseMovie();
      }
    });

    return function cleanup() {
      document.removeEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
          onCloseMovie();
        }
      });
    };
  }, [onCloseMovie]);

  return (
    <div className="details">
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <header>
            <button
              className="btn-back"
              onClick={onCloseMovie}
            >
              &larr;
            </button>
            <img
              src={poster}
              alt={`${title} poster`}
            />
            <div className="details-overview">
              <h2>{title}</h2>
              <p>
                {released} &bull; {runtime}
              </p>
              <p>{genre}</p>
              <p>
                <span>⭐️</span> {imdbRating} IMDB rating
              </p>
            </div>
          </header>

          <section>
            <div className="rating">
              {!isWatched ? (
                <>
                  <StarRating
                    maxRating={10}
                    size={24}
                    onSetRating={setUserRating}
                  />
                  {Number(userRating) > 0 && (
                    <button
                      className="btn-add"
                      onClick={handleAdd}
                    >
                      + Watched
                    </button>
                  )}
                </>
              ) : (
                <p>
                  You rated this movie with {watchedUserRating} <span>⭐️</span>
                </p>
              )}
            </div>
            <h3>Plot</h3>
            <p>{plot}</p>
            <h3>Cast</h3>
            <p>{actors}</p>
            <h3>Director</h3>
            <p>{director}</p>
          </section>
        </>
      )}
    </div>
  );
}
