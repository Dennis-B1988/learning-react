import { ListBox } from './ListBox';
import { WatchedBox } from './WatchedBox';

export function Main({ average, tempMovieData, tempWatchedData, movies }) {
  return (
    <main className="main">
      <ListBox
        tempMovieData={tempMovieData}
        movies={movies}
      />

      <WatchedBox
        average={average}
        tempWatchedData={tempWatchedData}
      />
    </main>
  );
}
