import { Routes, Route } from 'react-router-dom';
import Login from './components/Login';
import Search from './components/Search';

function App() {
  return (
    <>
      <p>Trybetunes</p>
      <Routes>
        <Route path="/" element={ <Login /> } />
        <Route path="/search" element={ <Search /> } />
        <Route />
        <Route />
        <Route />
        <Route />
        <Route />
      </Routes>
    </>
  );
}

export default App;
