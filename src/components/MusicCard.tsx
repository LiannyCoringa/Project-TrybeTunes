import { useState } from 'react';

type MusicCardProps = {
  trackName: string | undefined,
  previewUrl: string | undefined,
  trackId: number | undefined,
};

function MusicCard({ trackName, previewUrl, trackId }: MusicCardProps) {
  const [check, setCheck] = useState(false);
  const handleChange = () => {
    setCheck(!check);
  };
  return (
    <div>
      <p>{trackName}</p>
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
        onChange={ handleChange }
      />
    </div>
  );
}

export default MusicCard;
