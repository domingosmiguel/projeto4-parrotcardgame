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
                    '<div class="card" onclick="turnCard(this)">' +
                         '<div class="front-face face dsp-flex"><img src="' +
                         '../public/front.png" alt="parrot" /></div>' +
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
const turnCard = (target) => {
     const turnedCard = document.querySelector(".turned");
     target.classList.add("turned");
     console.log("cliclou");
     if (turnedCard) {
          const turnedCardImgSrc = turnedCard.querySelector(".back-face").querySelector("img").src;
          const targetImgSrc = target.querySelector(".back-face").querySelector("img").src;
          if (turnedCardImgSrc !== targetImgSrc) {
               setTimeout(function () {
                    target.classList.remove("turned");
                    turnedCard.classList.remove("turned");
               }, 1000);
          } else {
               target.classList.add("stuck");
               turnedCard.classList.add("stuck");
               target.classList.remove("turned");
               turnedCard.classList.remove("turned");
               target.onclick = "";
               turnedCard.onclick = "";
          }
     }
};
