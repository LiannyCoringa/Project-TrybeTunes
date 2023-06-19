import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getUser } from '../services/userAPI';

function Profile() {
  const [loading, setLoading] = useState(true);
  const [infosUser, setInfosUser] = useState({
    name: '',
    email: '',
    image: '',
    description: '',
  });

  useEffect(() => {
    const user = async () => {
      const infos = await getUser();
      setLoading(false);
      setInfosUser(infos);
    };
    user();
  }, []);
  if (loading) {
    return <h2>Carregando...</h2>;
  }

  return (
    <div>
      <img data-testid="profile-image" src={ infosUser.image } alt="imagem" />
      <Link to="/profile/edit">Editar perfil</Link>
      <h3>Nome</h3>
      <p>{ infosUser.name }</p>
      <h3>E-mail</h3>
      <p>{ infosUser.email }</p>
      <h3>Descrição</h3>
      <p>{ infosUser.description }</p>
    </div>
  );
}

export default Profile;
