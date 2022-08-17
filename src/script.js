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
                    '<div class="card" onclick="flipCard(this)">' +
                         '<div class="front-face face dsp-flex"><img src="' +
                         './public/front.png" alt="parrot" /></div>' +
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
let counter = 0;
const flipCard = (target) => {
     target.setAttribute("onclick", "");
     const flippedCard = document.querySelector(".flipped:not(.stuck)");
     target.classList.add("flipped");
     const bug = document.querySelector(".flipped.stuck");
     if (bug) {
          bug.classList.remove("flipped");
     } else {
          counter++;
          // console.log(counter);
          if (flippedCard) {
               const flippedCardImgSrc = flippedCard
                    .querySelector(".back-face")
                    .querySelector("img").src;
               const targetImgSrc = target.querySelector(".back-face").querySelector("img").src;
               if (flippedCardImgSrc === targetImgSrc) {
                    target.classList.add("stuck");
                    flippedCard.classList.add("stuck");
                    target.classList.remove("flipped");
                    flippedCard.classList.remove("flipped");
                    // console.log(document.querySelectorAll(".card"));
                    // console.log(document.querySelectorAll(".stuck"));
                    if (
                         document.querySelectorAll(".card").length ===
                         document.querySelectorAll(".stuck").length
                    ) {
                         // document.querySelector("main").innerHTML =
                         //      "<h1>Você ganhou em " + counter + " jogadas!</h1>";
                         alert("Você ganhou em " + counter + " jogadas!");
                    }
               } else {
                    setTimeout(function () {
                         target.classList.remove("flipped");
                         flippedCard.classList.remove("flipped");
                         target.setAttribute("onclick", "flipCard(this)");
                         flippedCard.setAttribute("onclick", "flipCard(this)");
                    }, 1000);
               }
          }
     }
};
