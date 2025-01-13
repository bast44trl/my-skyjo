import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import FrontCard from './FrontCard';
import BackCard from './BackCard';
import './card.scss';

const Card = ({
  card_num,
  card_visible = false,
  canBeFlipped,
  setCanBeFlipped,
  playerOneVisibleCards,
  setPlayerOneVisibleCards,
  setPlayerTwoTurn,
  handleGameRules,
}) => {
  const [flipped, setFlipped] = useState(false);
  const [selected, setSelected] = useState(false);

  useEffect(() => {
    setFlipped(card_visible);
  }, [card_visible]);

  function onCardClick(card_value) {
    canBeFlipped ? setFlipped(!flipped) : setSelected(!selected);
    if (playerOneVisibleCards && playerOneVisibleCards.length > 0) {
      setCanBeFlipped && setCanBeFlipped(false);
      handleGameRules && handleGameRules(2, '...can play. Click on the "Player 2 turn" button');
      setPlayerTwoTurn && setPlayerTwoTurn(true);
    }
    if (playerOneVisibleCards && playerOneVisibleCards.length < 2) {
      playerOneVisibleCards.push(card_value);
      setPlayerOneVisibleCards(playerOneVisibleCards);
    }
  }

  return (
    <div className="flip" onClick={() => onCardClick(card_num)} style={selected ? { transform: 'rotateZ(5deg)' } : {}}>
      <div
        className="flip--inner"
        style={{
          transform: flipped ? 'rotateY(180deg)' : 'rotateY(0deg)',
        }}
      >
        <FrontCard card_num={card_num} flipped={flipped} />
        <BackCard />
      </div>
    </div>
  );
};

Card.propTypes = {
  card_num: PropTypes.number,
  card_visible: PropTypes.bool,
  canBeFlipped: PropTypes.bool,
  setCanBeFlipped: PropTypes.func,
  selected: PropTypes.bool,
  playerOneVisibleCards: PropTypes.array,
  setPlayerOneVisibleCards: PropTypes.func,
  playerTwoVisibleCards: PropTypes.array,
  setPlayerTwoVisibleCards: PropTypes.func,
  playerTwoCards: PropTypes.array,
  setPlayerTwoTurn: PropTypes.func,
  handleGameRules: PropTypes.func,
};

export default Card;
