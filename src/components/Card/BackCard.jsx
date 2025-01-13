import cardBackground from '../../assets/svg/skyjoCardBack.svg';
import './backCard.scss';

const BackCard = () => {
  return (
    <button
      className="backCard"
      style={{
        backgroundImage: `url(${cardBackground})`,
      }}
    >
      <div className="container">
        <div className="overlay"></div>
      </div>
    </button>
  );
};

export default BackCard;
