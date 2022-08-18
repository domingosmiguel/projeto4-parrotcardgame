const stopwatch = () => {
     presentTime = new Date().getTime();
     totalTime = ((presentTime - startTime) / 1000).toFixed();
     cardsTable.querySelector("div.stopwatch").innerHTML = totalTime;
};

// Put the cards on the table and starts the stopwatch
const startGame = (cards) => {
     for (let i = 0; i < cards.length; i++) cardsTable.innerHTML += cards[i];
     // Calls 'stopwatch' every 1 second
     startTime = new Date().getTime();
     id = setInterval(stopwatch, 1000);
};
// Shuffle the cards
const shuffler = () => {
     return Math.random() - 0.5;
};
const cardsGeneration = (numbCards) => {
     let cardsArray = [];
     for (let j = 0; j < 2; j++) {
          for (let i = 0; i * 2 < numbCards; i++) {
               cardsArray.push(
                    '<div class="card" onclick="clickFilter(this)">' +
                         '<div class="front-face face dsp-flex"><img src="' +
                         './public/front.png" alt="parrot" /></div>' +
                         '<div class="back-face face dsp-flex"><img src="' +
                         cardsImages[i] +
                         '" alt="parrot" /></div></div>'
               );
          }
     }
     cardsArray.sort(shuffler);
     startGame(cardsArray);
};
const question = () => {
     let numberOfCards;
     cardsTable.innerHTML = '<div class="stopwatch dsp-flex"></div>';
     do {
          numberOfCards = prompt("Com quantas cartas deseja jogar?");
     } while (numberOfCards > 14 || numberOfCards < 4 || numberOfCards % 2 !== 0);
     counter = 0;
     cardsGeneration(numberOfCards);
};

const clickFilter = (clicked) => {
     const clickedBefore = document.querySelectorAll(".flipped:not(.stuck)");
     if (clickedBefore.length <= 1) {
          clicked.removeAttribute("onclick");
          clicked.classList.add("flipped");
          if (clickedBefore.length === 1) flipCard(clicked, clickedBefore[0]);
     }
};

const flipCard = (targetCard, flippedCard) => {
     counter += 2;
     const flippedCardImgSrc = flippedCard.querySelector(".back-face").querySelector("img").src;
     const targetImgSrc = targetCard.querySelector(".back-face").querySelector("img").src;
     if (flippedCardImgSrc === targetImgSrc) {
          targetCard.classList.add("stuck");
          flippedCard.classList.add("stuck");
          targetCard.classList.remove("flipped");
          flippedCard.classList.remove("flipped");
          if (
               document.querySelectorAll(".card").length ===
               document.querySelectorAll(".stuck").length
          ) {
               // Stops calling 'stopwatch'
               clearInterval(id);
               // cardsTable.innerHTML =
               //      "<h1>Você ganhou em " + counter + " jogadas!</h1>";
               alert("Você ganhou em " + counter + " jogadas e " + totalTime + " segundos");
               const answer = prompt("Gostaria de jogar novamente? (sim / não)");
               if (answer.toLowerCase() === "sim") question();
          }
     } else {
          setTimeout(function () {
               targetCard.classList.remove("flipped");
               flippedCard.classList.remove("flipped");
               targetCard.setAttribute("onclick", "clickFilter(this)");
               flippedCard.setAttribute("onclick", "clickFilter(this)");
          }, 1000);
     }
};
