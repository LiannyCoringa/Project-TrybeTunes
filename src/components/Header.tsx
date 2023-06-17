import { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { getUser } from '../services/userAPI';

function Header() {
  const [user, setUser] = useState({
    name: '',
    email: '',
    image: '',
    description: '',
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getUserLog = async () => {
      const data = await getUser();
      setUser(data);
      setLoading(false);
    };
    getUserLog();
  }, []);

  if (loading) {
    return <h3>Carregando...</h3>;
  }
  return (
    <header data-testid="header-component">
      <NavLink to="/search" data-testid="link-to-search">Search</NavLink>
      <NavLink to="/favorites" data-testid="link-to-favorites">Favorites</NavLink>
      <NavLink to="/profile" data-testid="link-to-profile">Profile</NavLink>
      <h3 data-testid="header-user-name">{ user.name }</h3>
    </header>
  );
}

export default Header;
