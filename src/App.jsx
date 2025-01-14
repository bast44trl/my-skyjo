import { Routes, Route } from 'react-router';
import AllTheCards from './components/Pages/AllTheCards/AllTheCards';
import NavBar from './components/NavBar/NavBar';
import BoardGame from './components/Pages/BoardGame/BoardGame';
import Home from './components/Pages/Home/Home';

import './assets/styles/main.scss';

const App = () => {
  return (
    <div className="app">
      <NavBar />
      <Routes>
        <Route path="home" element={<Home />} />
        <Route path="allthecards" element={<AllTheCards />} />
        <Route path="boardgame" element={<BoardGame />} />
      </Routes>
    </div>
  );
};

export default App;
