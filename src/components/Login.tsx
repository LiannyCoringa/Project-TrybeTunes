import { useState } from 'react';
import { Link } from 'react-router-dom';
import { createUser } from '../services/userAPI';

function Login() {
  const [buttonHabil, setButtonHabil] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [loading, setLoading] = useState(false);
  const handleChange = ({ target }: React.ChangeEvent<HTMLInputElement>) => {
    const verify = target.value.length >= 3 && setButtonHabil(true);
    setInputValue(target.value);
    return verify;
  };
  const handleClick = async (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    setLoading(true);
    await createUser({ name: inputValue });
    setLoading(false);
  };
  if (loading) {
    return <h2>Carregando...</h2>;
  }

  return (
    <form>
      <label htmlFor="name">Nome</label>
      <input
        type="text"
        id="name"
        data-testid="login-name-input"
        onChange={ handleChange }
      />
      { buttonHabil
        ? (
          <Link to="/search">
            <button
              data-testid="login-submit-button"
              onClick={ handleClick }
            >
              Entrar
            </button>
          </Link>
        )
        : (
          <Link to="/search">
            <button
              data-testid="login-submit-button"
              disabled
              onClick={ handleClick }
            >
              Entrar
            </button>
          </Link>
        ) }
    </form>
  );
}

export default Login;
