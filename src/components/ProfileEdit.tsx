import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getUser, updateUser } from '../services/userAPI';

function ProfileEdit() {
  const [loading, setLoading] = useState(true);
  const [loadingEdit, setLoadingEdit] = useState(false);
  const [infosUser, setInfosUser] = useState({
    name: '',
    email: '',
    image: '',
    description: '',
  });
  const [validation, setValidation] = useState(false);
  const [disable, setDisable] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const user = async () => {
      const infos = await getUser();
      setLoading(false);
      setInfosUser(infos);
      console.log(infosUser);
    };
    user();
  }, []);

  const handleChange = ({ target }: React.ChangeEvent<HTMLInputElement>) => {
    setInfosUser({ ...infosUser, [target.id]: target.value });
  };
  const { name, email, description, image } = infosUser;
  useEffect(() => {
    const emailRegex = /^[a-z0-9.]+@[a-z0-9]+\.[a-z]+$/i;
    if (name.length > 1
      && description.length > 1
      && image.length > 1
      && emailRegex.test(email)) {
      setValidation(true);
      setDisable(false);
    }
    if (validation) {
      setDisable(false);
    } else {
      setDisable(true);
    }
  }, [name, email, description, image]);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoadingEdit(true);
    await updateUser(infosUser);
    setLoadingEdit(false);
    navigate('/profile');
  };

  if (loading) {
    return <h2>Carregando...</h2>;
  }
  if (loadingEdit) {
    return <h2>Carregando...</h2>;
  }
  return (
    <form onSubmit={ handleSubmit }>
      <input
        type="text"
        id="name"
        data-testid="edit-input-name"
        placeholder="Nome"
        value={ infosUser.name }
        onChange={ handleChange }
      />
      <input
        type="text"
        id="email"
        data-testid="edit-input-email"
        placeholder="Email"
        value={ infosUser.email }
        onChange={ handleChange }
      />
      <input
        type="text"
        id="description"
        data-testid="edit-input-description"
        placeholder="Description"
        value={ infosUser.description }
        onChange={ handleChange }
      />
      <input
        type="text"
        id="image"
        data-testid="edit-input-image"
        placeholder="Imagem"
        value={ infosUser.image }
        onChange={ handleChange }
      />
      <button data-testid="edit-button-save" disabled={ disable }>Editar perfil</button>
    </form>
  );
}

export default ProfileEdit;
