import { useState } from 'react';
import { addSong, removeSong } from '../services/favoriteSongsAPI';
import { SongType } from '../types';

type MusicCardProps = {
  songProps: SongType
};

function MusicCard({ songProps: { trackId, trackName, previewUrl } }: MusicCardProps) {
  const [check, setCheck] = useState(false);
  const handleClick = async () => {
    setCheck(!check);
    await addSong({ trackName, trackId, previewUrl });
    if (check === false) {
      await removeSong({ trackName, trackId, previewUrl });
    }
  };
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
      <input
        type="checkbox"
        id={ `checkbox-music-${trackId}` }
        onClick={ handleClick }
      />
    </div>
  );
}

export default MusicCard;
