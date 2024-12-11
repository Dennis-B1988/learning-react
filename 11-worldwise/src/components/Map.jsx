import { useNavigate, useSearchParams } from 'react-router-dom';
import styles from './Map.module.css';

export default function Map() {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const lat = searchParams.get('lat');
  const lng = searchParams.get('lng');

  return (
    <div className={styles.mapContainer} onClick={() => navigate('form')}>
      {/* <iframe
        className={styles.map}
        width="100%"
        height="100%"
        frameBorder="0"
        scrolling="no"
        src={`https://maps.google.com/maps?q=${lat},${lng}&z=4&output=embed`}
      ></iframe> */}
    </div>
  );
}
