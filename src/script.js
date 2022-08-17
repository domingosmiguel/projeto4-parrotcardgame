const startGame = (cards) => {
     const cardsTable = document.querySelector("main");
     for (let i = 0; i < cards.length; i++) cardsTable.innerHTML += cards[i];
};
const comparador = () => {
     return Math.random() - 0.5;
};
const cardsGeneration = (numbCards) => {
     let cardsArray = [];
     for (let j = 0; j < 2; j++) {
          for (let i = 0; i * 2 < numbCards; i++) {
               cardsArray.push(
                    '<div class="card">' +
                         '<div class="front-face face dsp-flex"><img src="' +
                         "../public/front.png" +
                         '" alt="parrot" /></div>' +
                         '<div class="back-face face dsp-flex"><img src="' +
                         cardsImages[i] +
                         '" alt="parrot" /></div></div>'
               );
          }
     }
     cardsArray.sort(comparador);
     startGame(cardsArray);
};
const question = () => {
     let numberOfCards;
     do {
          numberOfCards = prompt("Com quantas cartas deseja jogar?");
     } while (numberOfCards > 14 || numberOfCards < 4 || numberOfCards % 2 !== 0);
     cardsGeneration(numberOfCards);
};
