import { useState } from 'react';
import { Button } from './Button';
import { WatchedMoviesList } from './WatchedMoviesList';
import { WatchedSummary } from './WatchedSummary';

export function WatchedBox({ tempWatchedData }) {
  const [isOpen2, setIsOpen2] = useState(true);
  const [watched, setWatched] = useState(tempWatchedData);

  return (
    <div className="box">
      <Button
        isOpen={isOpen2}
        setIsOpen={setIsOpen2}
      />
      {isOpen2 && (
        <>
          <WatchedSummary watched={watched} />
          <WatchedMoviesList watched={watched} />
        </>
      )}
    </div>
  );
}
