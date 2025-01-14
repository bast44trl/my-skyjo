import { Link } from 'react-router';

import './navBar.scss';

const NavBar = () => {
  return (
    <div className="navbar-container">
      <ul className="navbar">
        <li className="navbar-links">
          <Link to="/">Home</Link>
        </li>
        <li className="navbar-links">
          <Link to="/allthecards">All The Cards</Link>
        </li>
        <li className="navbar-links">
          <Link to="/boardgame">Board Game</Link>
        </li>
      </ul>
    </div>
  );
};

export default NavBar;
