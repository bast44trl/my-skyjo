import skyjoBg from '../../../assets/images/skyjo-bg.jpg';
import './home.scss';

const Home = () => {
  return (
    <div className="home-container">
      <h1>Welcome to Skyjo!</h1>
      <img src={skyjoBg} alt="" />
      <p>Click on the &quot;All The Cards&quot; link to see all the cards in the game.</p>
      <p>Click on the &quot;Board Game One&quot; link to play a game of Skyjo.</p>
    </div>
  );
};

export default Home;
