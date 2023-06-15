import { useState } from 'react';
import { Link } from 'react-router-dom';
import searchAlbumsAPI from '../services/searchAlbumsAPI';

function Search() {
  const [buttonHabil, setButtonHabil] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [loading, setLoading] = useState(false);
  const [artist, setArtist] = useState('');
  const [albuns, setAlbuns] = useState([{
    artistId: 0,
    artistName: '',
    collectionId: 0,
    collectionName: '',
    collectionPrice: 0,
    artworkUrl100: '',
    releaseDate: '',
    trackCount: 0,
  }]);

  const handleChange = ({ target }: React.ChangeEvent<HTMLInputElement>) => {
    const verify = target.value.length >= 2 && setButtonHabil(true);
    setInputValue(target.value);
    return verify;
  };
  const handleClick = async () => {
    setLoading(true);
    const response = await searchAlbumsAPI(inputValue);
    setLoading(false);
    setArtist(inputValue);
    setAlbuns(response);
    setInputValue('');
  };
  return (
    <>
      { loading
        ? <h2>Carregando...</h2>
        : (
          <form>
            <input
              type="text"
              data-testid="search-artist-input"
              onChange={ handleChange }
              value={ inputValue }
            />
            {buttonHabil
              ? (
                <button
                  data-testid="search-artist-button"
                  onClick={ handleClick }
                >
                  Pesquisar
                </button>)
              : (
                <button
                  data-testid="search-artist-button"
                  disabled
                  onClick={ handleClick }
                >
                  Pesquisar
                </button>
              )}
          </form>
        )}
      { artist.length >= 1 && (
        <div>
          <h2>
            Resultado de álbuns de:
            {' '}
            { artist }
          </h2>
          { albuns.length >= 1
            ? (albuns.map((album) => (
              <div key={ album.artistId }>
                <Link
                  to={ `/album/${album.collectionId}` }
                  data-testid={ `link-to-album-${album.collectionId}` }
                >
                  <img src={ album.artworkUrl100 } alt="imagem album" />
                  <p>{ `Album ${album.collectionName}` }</p>
                  <p>{ album.artistName }</p>
                </Link>
              </div>)))
            : <h2>Nenhum álbum foi encontrado</h2>}
        </div>
      )}
    </>
  );
}

export default Search;
