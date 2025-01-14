import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';
import overlay from '../../assets/images/overlay-1.png';
import './frontCard.scss';

const FrontCard = ({ card_num, flipped, onDiscardPile = false }) => {
  const [underlined, setUnderlined] = useState(false);
  const bgColor = (card_num) => {
    if (card_num < 0) {
      return '#330099';
    } else if (card_num == 0) {
      return '#66ccff';
    } else if (card_num <= 4) {
      return '#00cc33';
    } else if (card_num <= 8) {
      return '#FFFF00';
    } else if (card_num <= 12) {
      return '#FF0033';
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
        backgroundImage: `radial-gradient(circle,rgb(255, 255, 255) 1%, ${bgColor(card_num)})`,
        textDecoration: underlined ? 'underline' : 'none',
        transform: `${onDiscardPile ? '' : 'rotateY(180deg)'} ${flipped ? 'translateX(20px)' : ''}`,
      }}
    >
      <div className="container">
        <div className="frontCard-header">
          <div className="frontCard-header-left">{card_num}</div>
        </div>
        <div className="frontCard-middle">{card_num}</div>
        <div className="frontCard-footer">
          <div className="frontCard-footer-left">{card_num}</div>
        </div>{' '}
        <div className="overlay" style={{ backgroundImage: `url(${overlay})` }}></div>{' '}
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
