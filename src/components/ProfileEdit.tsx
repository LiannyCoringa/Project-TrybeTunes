import { useEffect, useState } from "react";
import { getUser } from "../services/userAPI";

function ProfileEdit() {
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
    <h1>Editar</h1>
  );
}

export default ProfileEdit;
