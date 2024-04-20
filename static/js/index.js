// start game---
function startGame(btn) {
    // get user name
    let userName = window.prompt("Welcome player , Enter Your Name");
    // check userName---
    if(userName == null || userName == "") {
        // catch name element--
        document.querySelector(".player-name span").textContent = "player";
        // remove screen--
        btn.parentElement.remove();

        // play background_sound--
        document.getElementById('background_sound').play();

        // play timer---
        gameTimer();
    } 
    else {
        // catch name element--
        document.querySelector(".player-name span").textContent = userName;
        // remove screen--
        btn.parentElement.remove();

        // play background_sound--
        document.getElementById('background_sound').play();

        // play timer---
        gameTimer();
    };
};


// timer function--------
function gameTimer() {
    // get timer element and declare time variables---
    let timerElement = document.querySelector(".timer"),
    startingTime = 3,
    time = startingTime * 60;

    let timer = setInterval(_ => {
        // declare minutes and seconds---
        let minutes = Math.floor(time / 60),
        seconds = time % 60;

        // add 0 when seconds less than 10--
        seconds = seconds < 10 ? `0${seconds}` : seconds;
        timerElement.innerHTML = `${minutes}:${seconds}`;
        time--;

        // avoid negative numbers and to stop timer------
        if (time == 0) {
            clearInterval(timer);
            gameOver();
        }
    } , 1000);
};


// start shuffling------------------------------------------------------------------------------------
let cards = document.querySelectorAll(".gm-cards"),
orderRange = [...Array.from(cards).keys()],
cardDuration = 1000,
wrongTriesCount = document.querySelector(".fail-tries span");


shuffling(orderRange);

function shuffling(orderArray) {
    // set shuffle variables--
    let currentIndex = orderArray.length, temporaryValue, randomIndex;

    for (let i of orderArray) {
        // get random index from array--
        randomIndex = Math.floor(Math.random() * currentIndex);

        // set temporary value-----
        temporaryValue = orderArray[i];

        // change index with one of random indexes--
        orderArray[i] = orderArray[randomIndex];

        // swap --------
        orderArray[randomIndex] = temporaryValue;
    }

    return orderArray;
};

// change cards order------------
cards.forEach((card , i) => {
    // change cards order --------
    card.style.order = orderRange[i];

    // add click event to every card------
    card.addEventListener("click" , function () {
        flibbedCards(this);
    });
});


// flibbedCards function---------------
function flibbedCards(selectedCard) {
    // add flip class to each card-----
    selectedCard.classList.add('flip');

    // get all flipped cards to get only two cards and check------
    let fliped_cards = Array.from(cards).filter(card => card.classList.contains('flip'));
    
    if(fliped_cards.length == 2) {
        // preventClick function------
        preventClick();

        // matchedCards function------
        matchedCards(fliped_cards[0] , fliped_cards[1]);
    }
};


// preventClick function------
function preventClick() {
    // add stop-event class to game-container------
    document.querySelector('.game-container').classList.add('stop-event');

    // remove stop-event class after the duration---
    setTimeout(() => {
        document.querySelector('.game-container').classList.remove('stop-event');
    } , cardDuration);
};



// matchedCards function--------
function matchedCards(firstCard , secondCard) {
    // check if the both of flipped cards are matched or not----
    if(firstCard.dataset.tech === secondCard.dataset.tech) {
        // remove flip class from each card----
        firstCard.classList.remove('flip');
        secondCard.classList.remove('flip');

        // add matched class-----
        firstCard.classList.add('matched');
        secondCard.classList.add('matched');

        // play success audio-----
        document.getElementById("success").play();
    }
    else {
        wrongTriesCount.textContent = parseInt(wrongTriesCount.textContent) + 1;

        // remove flip class from each card----
        setTimeout(_ => {
            firstCard.classList.remove('flip');
            secondCard.classList.remove('flip');
        } , cardDuration);

        // play fail audio----
        document.getElementById("fail").play();
    }

    finishAllMathced();
};

// all cards are mathced-------
function finishAllMathced() {
    // check if all cards are mathced------
    let checkAll = Array.from(cards).every(card => card.classList.contains("matched"));

    if(checkAll) {
        // show winner div-----
        let winnerDiv = document.querySelector(".winner"),
        winnerParagraph = document.querySelector('.winner p');
        winnerDiv.style.display = "block";

        // timer to play a gain---
        setInterval(_ => {
            winnerParagraph.textContent = parseInt(winnerParagraph.textContent) - 1;

            // reload when timer reaches end----
            if(winnerParagraph.textContent == "0") {
                window.location.reload();
            }
        } , 1000);
    }
};



// game over function----
function gameOver() {
    let loseDiv = document.querySelector(".lose"),
    loseParagraph = document.querySelector(".lose p");
    loseDiv.style.display = "block";

    setInterval(_ => {
        loseParagraph.textContent = parseInt(loseParagraph.textContent) - 1;

        // reload when timer reaches end----
        if(loseParagraph.textContent == "0") {
            window.location.reload();
        }
    } , 1000);
}
