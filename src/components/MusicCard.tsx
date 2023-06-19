import { useEffect, useState } from 'react';
import { addSong, getFavoriteSongs, removeSong } from '../services/favoriteSongsAPI';
import { SongType } from '../types';

type MusicCardProps = {
  songProps: SongType
};

function MusicCard({ songProps: { trackId, trackName, previewUrl } }: MusicCardProps) {
  const [check, setCheck] = useState(false);
  const [loading, setLoading] = useState(true);
  const handleClick = async () => {
    setCheck(!check);
    if (check === true) {
      await removeSong({ trackName, trackId, previewUrl });
    } else {
      await addSong({ trackName, trackId, previewUrl });
    }
  };
  useEffect(() => {
    const favorites = async () => {
      const listFavoritesSong = await getFavoriteSongs();
      const trackIdList = listFavoritesSong.find((obj) => obj.trackId === trackId);
      if (trackIdList !== undefined) {
        setCheck(true);
      } else {
        setCheck(false);
      }
      setLoading(false);
    };
    favorites();
  }, []);

  if (loading) {
    return <h2>Carregando...</h2>;
  }

  return (
    <div>
      <p>{ trackName }</p>
      <audio data-testid="audio-component" src={ previewUrl } controls>
        <track kind="captions" />
        O seu navegador não suporta o elemento
        {' '}
        <code>audio</code>
        .
      </audio>
      <label
        htmlFor={ `checkbox-music-${trackId}` }
        data-testid={ `checkbox-music-${trackId}` }
      >
        {check
          ? <img src="/src/images/checked_heart.png" alt="favorite" />
          : <img src="/src/images/empty_heart.png" alt="favorite" />}
      </label>
      {check
        ? (
          <input
            type="checkbox"
            id={ `checkbox-music-${trackId}` }
            onClick={ handleClick }
            checked
          />
        )
        : (
          <input
            type="checkbox"
            id={ `checkbox-music-${trackId}` }
            onClick={ handleClick }
          />
        )}
    </div>
  );
}

export default MusicCard;
