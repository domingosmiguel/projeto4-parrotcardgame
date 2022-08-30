const stopwatch = (startTime) => {
    const presentTime = new Date().getTime();
    totalTime = ((presentTime - startTime) / 1000).toFixed();
    cardsTable.querySelector("div.stopwatch").innerHTML = `${totalTime}s`;
};
const startGame = (cards) => {
    for (let i = 0; i < cards.length; i++) {
        cardsTable.innerHTML += cards[i];
    }
    const gameStarted = new Date().getTime();
    id = setInterval(stopwatch, 1000, gameStarted);
};
const shuffler = () => {
    return Math.random() - 0.5;
};
const cardsGeneration = (numbCards) => {
    const cardsArray = [];
    for (let j = 0; j < 2; j++) {
        for (let i = 0; i * 2 < numbCards; i++) {
            cardsArray.push(
                `<div class="card" onclick="clickFilter(this)"> 
                         <div class="front-face face dsp-flex">
                              <img src="./public/front.png" alt="parrot" />
                         </div> 
                         <div class="back-face face dsp-flex">
                              <img src="${cardsImages[i]}" alt="parrot" />
                         </div>
                    </div>`
            );
        }
    }
    cardsArray.sort(shuffler);
    startGame(cardsArray);
};
const gameStartQuestion = () => {
    let numberOfCards;
    cardsTable.innerHTML = '<div class="stopwatch dsp-flex"></div>';
    do {
        numberOfCards = prompt("Com quantas cartas deseja jogar?");
    } while (numberOfCards > 14 || numberOfCards < 4 || numberOfCards % 2 !== 0);
    cardsGeneration(numberOfCards);
};
const clickFilter = (clicked) => {
    const clickedBefore = document.querySelectorAll(".flipped:not(.stuck)");
    if (clickedBefore.length <= 1) {
        clicked.removeAttribute("onclick");
        clicked.classList.add("flipped");
        if (clickedBefore.length === 1) {
            flipCard(clicked, clickedBefore[0]);
        }
    }
};
const flipCard = (targetCard, flippedCard) => {
    counter += 2;
    const flippedCardImgSrc = flippedCard.querySelector(".back-face").querySelector("img").src;
    const targetImgSrc = targetCard.querySelector(".back-face").querySelector("img").src;
    if (flippedCardImgSrc !== targetImgSrc) {
        setTimeout(() => {
            targetCard.classList.remove("flipped");
            flippedCard.classList.remove("flipped");
            targetCard.setAttribute("onclick", "clickFilter(this)");
            flippedCard.setAttribute("onclick", "clickFilter(this)");
        }, 1000);
    } else {
        targetCard.classList.add("stuck");
        flippedCard.classList.add("stuck");
        targetCard.classList.remove("flipped");
        flippedCard.classList.remove("flipped");
        if (
            document.querySelectorAll(".card").length === document.querySelectorAll(".stuck").length
        ) {
            clearInterval(id);
            setTimeout(() => {
                alert("Você ganhou em " + counter + " jogadas e " + totalTime + " segundos");
                const answer = confirm("Gostaria de jogar novamente?");
                if (answer) {
                    document.location.reload();
                }
            }, 100);
        }
    }
};
