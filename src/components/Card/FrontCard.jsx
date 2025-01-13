import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';
import overlay from '../../assets/images/overlay-1.png';
import './frontCard.scss';

const FrontCard = ({ card_num, flipped, onDiscardPile = false }) => {
  const [underlined, setUnderlined] = useState(false);
  const bgColor = (card_num) => {
    if (card_num < 0) {
      return 'blue';
    } else if (card_num == 0) {
      return 'cyan';
    } else if (card_num <= 4) {
      return 'green';
    } else if (card_num <= 8) {
      return 'yellow';
    } else if (card_num <= 12) {
      return 'red';
    }
  };

  useEffect(() => {
    (card_num === 6 || card_num === 9) && setUnderlined(true);
  }, [card_num]);

  return (
    <button
      className="frontCard"
      style={{
        backgroundColor: bgColor(card_num),
        backgroundImage: `radial-gradient(circle,rgb(197, 199, 205), ${bgColor(card_num)})`,
        textDecoration: underlined ? 'underline' : 'none',
        transform: `${onDiscardPile ? '' : 'rotateY(180deg)'} ${flipped ? 'translateX(20px)' : ''}`,
      }}
    >
      <div className="container">
        <div className="overlay" style={{ background: `url(${overlay})` }}></div>
        <div className="frontCard-header">
          <div className="frontCard-header-left">{card_num}</div>
        </div>
        <div className="frontCard-middle">{card_num}</div>
        <div className="frontCard-footer">
          <div className="frontCard-footer-left">{card_num}</div>
        </div>{' '}
      </div>
    </button>
  );
};

FrontCard.propTypes = {
  card_num: PropTypes.number,
  bgColor: PropTypes.func,
  flipped: PropTypes.bool,
  onDiscardPile: PropTypes.bool,
};

export default FrontCard;
