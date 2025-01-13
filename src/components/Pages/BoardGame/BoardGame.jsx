import { useState, useEffect, useCallback } from 'react';
import Card from '../../Card/Card';
import { useShuffle } from 'react-shuffle-array';
import { allCards } from '../../../data';

import './boardGame.scss';

const BoardGame = () => {
  const [playerOneCards, setPlayerOneCards] = useState([]);
  const [playerTwoCards, setPlayerTwoCards] = useState([]);
  const [drawPile, setDrawPile] = useState([]);
  const shuffledArr = useShuffle({ array: allCards });
  const [playerOneVisibleCards, setPlayerOneVisibleCards] = useState([]);
  const [playerTwoVisibleCards, setPlayerTwoVisibleCards] = useState([]);
  const [canBeFlipped, setCanBeFlipped] = useState(true);
  const [playerTwoTurn, setPlayerTwoTurn] = useState(false);
  const [gameOn, setGameOn] = useState(false);
  const [playerTurnAndRules, setPlayerTurnAndRules] = useState({
    player: 1,
    rules: 'Click on a dealing button to deal player cards',
  });
  /*   const whoseTurn = playerTwoTurn ? 'TWO' : 'ONE';
  let rules = 'Select two cards to flip'; */
  let flippedCards = [];
  let identicalCards = playerTwoVisibleCards[0] === playerTwoVisibleCards[1];

  useEffect(() => {
    setDrawPile(shuffledArr);
  }, [shuffledArr]);

  const dealcard = useCallback(
    (nbOfCard) => {
      let filteredArray = shuffledArr.filter((e, i) => i < nbOfCard);
      setDrawPile(drawPile.filter((e, i) => i >= nbOfCard));
      return filteredArray;
    },
    [shuffledArr, drawPile],
  );

  const handleGameRules = (player, rules) => {
    setPlayerTurnAndRules((playerTurnAndRules) => ({ ...playerTurnAndRules, player: player, rules: rules }));
  };

  const handleDealing = (player) => {
    if (player === 1) {
      setPlayerOneCards(dealcard(12));
      handleGameRules(2, '...is waiting. Click on a dealing button to deal player cards');
    } else if (player === 2) {
      setPlayerTwoCards(dealcard(12));
      handleGameRules(1, 'Select 2 cards to flip');
    }
  };

  const cardVisible = (cardValue) => {
    let cardFound = playerTwoVisibleCards.includes(cardValue);
    if (flippedCards.length === 2) {
      return false;
    } else if (identicalCards && cardFound) {
      flippedCards.push(cardValue);
      return true;
    } else if (!identicalCards && cardFound) {
      if (flippedCards.length === 1 && flippedCards[0] === cardValue) {
        return false;
      } else {
        flippedCards.push(cardValue);
        return true;
      }
    }
  };

  const handleWhoseTurn = () => {
    let playerOneSum = playerOneVisibleCards.reduce((a, b) => a + b, 0);
    let playerTwoSum = playerTwoVisibleCards.reduce((a, b) => a + b, 0);

    // if the 2 players are tight, then the biggest card value get the turn !
    if (playerOneSum === playerTwoSum) {
      let playerOneIsBigger = Math.max.apply(null, playerOneVisibleCards) > Math.max.apply(null, playerTwoVisibleCards);
      setPlayerTwoTurn(playerOneIsBigger ? false : true);
    } else setPlayerTwoTurn(playerOneSum > playerTwoSum ? false : true);
    setGameOn(true);
  };
  useEffect(() => {
    gameOn && handleGameRules(playerTwoTurn ? 2 : 1, 'Your turn. Draw a card from the draw pile.');
  }, [gameOn, playerTwoTurn]);

  const handlePlayerTwoTurn = () => {
    let cardToFlip;
    let randomNumber;
    for (let i = 0; i < playerOneVisibleCards.length; i++) {
      while (cardToFlip === randomNumber) {
        randomNumber = Math.floor(Math.random() * 11 + 0);
        console.log('cardToFlip: ', cardToFlip);
        console.log('randomNumber: ', randomNumber);
      }
      cardToFlip = randomNumber;
      cardToFlip && playerTwoVisibleCards.push(playerTwoCards[cardToFlip].value);
      setPlayerTwoVisibleCards(playerTwoVisibleCards);
    }
    setPlayerTwoTurn(false);
    setTimeout(() => {
      handleWhoseTurn();
    }, 500);
  };
  const onDrawCard = (value) => {
    const drawCard = value;
    console.log('drawCard: ', drawCard);
  };

  return (
    <div className="boardgame">
      <p>Play a game of Skyjo!</p>
      <div className="boardgame-container">
        <div className="player-cards">
          {playerOneCards.length > 0 &&
            playerOneCards.map((card, i) => (
              <Card
                key={i}
                card_num={card.value}
                canBeFlipped={canBeFlipped}
                setCanBeFlipped={setCanBeFlipped}
                playerOneVisibleCards={playerOneVisibleCards}
                setPlayerOneVisibleCards={setPlayerOneVisibleCards}
                setPlayerTwoTurn={setPlayerTwoTurn}
                handleGameRules={handleGameRules}
              />
            ))}
        </div>
        <div className="draw-discard-container">
          <div className="draw-discard-container-rules">
            <h3>{`Player ${playerTurnAndRules.player}`}</h3>
            <p>{playerTurnAndRules.rules}</p>
          </div>

          <div className="draw-discard-container-piles">
            <div className="draw-pile">
              {drawPile && (
                <Card
                  onClick={onDrawCard}
                  canBeFlipped={gameOn && !playerTwoTurn}
                  card_num={gameOn ? drawPile[1].value : null}
                />
              )}
            </div>
            <div className="discard-pile">
              {playerOneCards.length > 0 && playerTwoCards.length > 0 && (
                <Card card_num={drawPile[0].value} card_visible />
              )}
            </div>
          </div>
          <div className="draw-discard-container-buttons">
            {!playerOneCards.length && (
              <button className="button" onClick={() => handleDealing(1)}>
                Deal 12 cards to player 1
              </button>
            )}
            {!!playerOneCards.length && !playerTwoCards.length && (
              <button className="button" onClick={() => handleDealing(2)}>
                Deal 12 cards to player 2
              </button>
            )}

            {playerTwoTurn && (
              <button
                className="button"
                onClick={() => {
                  handlePlayerTwoTurn();
                }}
              >
                Player 2 turn
              </button>
            )}
          </div>

          {playerOneVisibleCards.length > 1 && (
            <p>{`Player 1 score = ${playerOneVisibleCards.reduce((a, b) => a + b, 0)}`}</p>
          )}
          {playerTwoVisibleCards.length > 1 && (
            <p>{`Player 2 score = ${playerTwoVisibleCards.reduce((a, b) => a + b, 0)}`}</p>
          )}
        </div>
        <div className="player-cards">
          {playerTwoCards &&
            playerTwoCards.map((card, i) => (
              <Card
                key={i}
                card_num={card.value}
                canBeFlipped={playerTwoTurn && playerTwoVisibleCards.length > 2}
                setCanBeFlipped={setCanBeFlipped}
                card_visible={cardVisible(card.value)}
              />
            ))}
        </div>
      </div>
    </div>
  );
};

export default BoardGame;
