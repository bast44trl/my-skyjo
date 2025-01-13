import Card from '../../Card/Card'; // Adjust the import path as necessary
import { cards } from '../../../data'; // Adjust the import path as necessary
import './allTheCards.scss';

const AllTheCards = () => {
  return (
    <div className="all-the-cards">
      <h1>Displaying all the cards from the game</h1>
      <div className="all-the-cards-display">
        {cards.map((card, index) => (
          <div key={index} className="all-the-cards-display-card-container">
            <div className="all-the-cards-display-card-container-quantity">X {card.quantity}</div>
            {Array.from({ length: card.quantity }).map((_, i) => (
              <Card key={`${index}-${i}`} card_num={card.value} card_visible={true} />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default AllTheCards;
