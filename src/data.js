export const cards = [
  { value: -2, color: 'purple', text: '-2', quantity: 5 },
  { value: -1, color: 'purple', text: '-1', quantity: 10 },
  { value: 0, color: 'blue', text: '0', quantity: 15 },
  { value: 1, color: 'green', text: '1', quantity: 10 },
  { value: 2, color: 'green', text: '2', quantity: 10 },
  { value: 3, color: 'green', text: '3', quantity: 10 },
  { value: 4, color: 'green', text: '4', quantity: 10 },
  { value: 5, color: 'yellow', text: '5', quantity: 10 },
  { value: 6, color: 'yellow', text: '6', quantity: 10 },
  { value: 7, color: 'yellow', text: '7', quantity: 10 },
  { value: 8, color: 'yellow', text: '8', quantity: 10 },
  { value: 9, color: 'yellow', text: '9', quantity: 10 },
  { value: 10, color: 'red', text: '10', quantity: 10 },
  { value: 11, color: 'red', text: '11', quantity: 10 },
  { value: 12, color: 'red', text: '12', quantity: 10 },
];

let allCardsPile = [];
function mainPile(allCards) {
  allCards.forEach((card) => {
    for (let i = 0; i < card.quantity; i++) {
      allCardsPile.push(card);
    }
  });
  return allCardsPile;
}

export const allCards = mainPile(cards);
