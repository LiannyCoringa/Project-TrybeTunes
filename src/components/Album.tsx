import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import getMusics from '../services/musicsAPI';
import { SongType, AlbumType } from '../types';
import MusicCard from './MusicCard';

function Album() {
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState({
    artistName: '',
    collectionName: '',
  });
  const [song, setSong] = useState<[AlbumType, ...SongType[]] | []>([]);

  useEffect(() => {
    const reqAPI = async () => {
      if (id) {
        const dataAPI = await getMusics(id);
        setLoading(false);
        setData(dataAPI[0]);
        setSong(dataAPI);
        console.log(dataAPI);
      }
    };
    reqAPI();
  }, [id]);
  if (loading) {
    return <h2>Carregando...</h2>;
  }
  return (
    <>
      <h2 data-testid="artist-name">{ data.artistName }</h2>
      <h3 data-testid="album-name">{ data.collectionName }</h3>
      {song.slice(1).map((obj) => (
        <MusicCard
          key={ obj.trackId }
          songProps={ obj }
          // trackName={ obj.trackName }
          // previewUrl={ obj.previewUrl }
          // trackId={ obj.trackId }
        />
      ))}
    </>
  );
}

export default Album;
