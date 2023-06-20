import { Routes, Route } from 'react-router-dom';
import Login from './components/Login';
import Search from './components/Search';
import Album from './components/Album';
import Layout from './components/Layout';
import Profile from './components/Profile';
import ProfileEdit from './components/ProfileEdit';
import Favorites from './components/Favorites';

function App() {
  return (
    <>
      <p>Trybetunes</p>
      <Routes>
        <Route path="/" element={ <Login /> } />
        <Route path="/" element={ <Layout /> }>
          <Route path="/search" element={ <Search /> } />
          <Route path="/album/:id" element={ <Album /> } />
          <Route path="/favorites" element={ <Favorites /> } />
          <Route path="/profile" element={ <Profile /> } />
          <Route path="/profile/edit" element={ <ProfileEdit /> } />
          <Route />
        </Route>
      </Routes>
    </>
  );
}

export default App;
