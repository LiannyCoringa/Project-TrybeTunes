import { useEffect, useState } from 'react';
import { getFavoriteSongs } from '../services/favoriteSongsAPI';
import MusicCard from './MusicCard';

function Favorites() {
  const [loading, setLoading] = useState(true);
  const [listId, setListId] = useState([0]);
  const [list, setList] = useState([{
    trackName: '',
    trackId: 0,
    previewUrl: '',
  }]);
  const musicsList = async () => {
    const musics = await getFavoriteSongs();
    const listID = musics.map((obj) => obj.trackId);
    setListId(listID);
    setList(musics);
  };
  useEffect(() => {
    musicsList();
    setLoading(false);
  }, []);

  if (loading) {
    return <h2>Carregando...</h2>;
  }

  return (
    <div>
      {
        list.map((music) => (
          <MusicCard
            songProps={ music }
            key={ music.trackId }
            functionList={ musicsList }
            list={ listId }
          />
        ))
      }
    </div>
  );
}

export default Favorites;
