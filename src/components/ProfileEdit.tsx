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
  const [validationName, setValidationName] = useState(false);
  const [validationEmail, setValidationEmail] = useState(false);
  const [validationDescription, setValidationDescriprion] = useState(false);
  const [validationImage, setValidationImage] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {
    const user = async () => {
      const infos = await getUser();
      if (infos) {
        setLoading(false);
        setInfosUser(infos);
      }
    };
    user();
  }, []);
  const handleValidationName = ({ target }: React.ChangeEvent<HTMLInputElement>) => {
    if (target.value.length > 1) {
    setValidationName(true);
    setInfosUser({ ...infosUser, name: target.value })
    };
  };
  const handleValidationEmail = ({ target }: React.ChangeEvent<HTMLInputElement>) => {
    const emailRegex = /^[a-z0-9.]+@[a-z0-9]+\.[a-z]+$/i;
    if (target.value.length > 1 && emailRegex.test(target.value)) {
      setValidationEmail(true);
      setInfosUser({ ...infosUser, email: target.value })
    };
  };
  const handleValidationDescription = ({ target }: React.ChangeEvent<HTMLInputElement>) => {
    if (target.value.length > 1) {
    setValidationDescriprion(true);
    setInfosUser({ ...infosUser, description: target.value })
    };
  };
  const handleValidationImage = ({ target }: React.ChangeEvent<HTMLInputElement>) => {
    if (target.value.length > 1) {
    setValidationImage(true);
    setInfosUser({ ...infosUser, image: target.value })
    };
  };
  const handleClick = async () => {
        setLoadingEdit(true);
        const userAPI = await updateUser(infosUser);
        if (userAPI) {
          setLoadingEdit(false);
          navigate("/profile");
      }
  }
  if (loading) {
    return <h2>Carregando...</h2>;
  }
  if (loadingEdit) {
    return <h2>Carregando...</h2>;
  }
  return (
    <form>
      <input
        type="text"
        id="name"
        data-testid="edit-input-name"
        placeholder="Nome"
        onChange={ handleValidationName }
      />
      <input
        type="text"
        id="email"
        data-testid="edit-input-email"
        placeholder="Email"
        onChange={ handleValidationEmail }
      />
      <input
        type="text"
        id="description"
        data-testid="edit-input-description"
        placeholder="Description"
        onChange={ handleValidationDescription }
      />
      <input
        type="text"
        id="image"
        data-testid="edit-input-image"
        placeholder="Imagem"
        onChange={ handleValidationImage }
      />
      {validationName && validationEmail && validationDescription && validationImage
        ? <button data-testid="edit-button-save" onClick={ handleClick }>Salvar</button>
        : <button data-testid="edit-button-save" disabled>Editar perfil</button>}
    </form>
  );
}

export default ProfileEdit;
