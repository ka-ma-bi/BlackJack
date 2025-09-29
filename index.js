let cards = []
let sum = 0
let hasBlackjack = false
let isAlive = false
let message = ""
let messageEL = document.getElementById("message-el")
let sumEl = document.getElementById("sum-el")
let cardsEL = document.getElementById("cards-el")

let player = {
    balance: "Balance",
    chips: 150
}

let playerEl = document.getElementById("player-el")
playerEl.textContent = player.balance + ": $"+ player.chips

function getRandomCard() {
    let randomNumber = Math.floor(Math.random() * 13) + 1
    if (randomNumber > 10) {
        return 10
    } else {
        return randomNumber
    }
}

function startGame() {
    if (player.chips < 10) {
        messageEL.textContent = "Not enough chips to play!"
        return
    }

    isAlive = true
    hasBlackjack = false
    cards = []
    sum = 0

    let firstCard = getRandomCard()
    let secondCard = getRandomCard()
    cards = [firstCard, secondCard]
    sum = firstCard + secondCard

    checkGameOutcome()  
    renderGame()
}

function newCard() {
    if (isAlive && !hasBlackjack) {
        let card = getRandomCard()
        sum += card
        cards.push(card)
        checkGameOutcome() 
        renderGame()
    }
}

function checkGameOutcome() {
    const messageEl = document.getElementById("message-el");
    messageEl.classList.remove("lost-message", "win-message");

    if (sum === 21 && !hasBlackjack) {
        // Player hits Blackjack
        hasBlackjack = true;
        isAlive = false;
        player.chips += 50;
        message = "Wohoo! You've got Blackjack!";
        messageEl.classList.add("win-message");  // green style for win
    } else if (sum > 21 && isAlive) {
        // Player busts
        isAlive = false;
        player.chips -= 10;
        if (player.chips < 0) player.chips = 0;
        message = "You're out of the game!";
        messageEl.classList.add("lost-message"); // red style for loss
    } else if (sum < 21 && isAlive) {
        // Game is ongoing
        message = "Do you want to draw a new card?";
    }

    // Update the message and player chips display
    messageEl.textContent = message;
    const playerEl = document.getElementById("player-el");
    playerEl.textContent = player.balance + ": $" + player.chips;
}

function renderGame() {
    // Clear the previous cards
    cardsEL.innerHTML = "";

    // Loop through the cards array and create an image for each
    cards.forEach(card => {
        let cardImg = document.createElement("img");
        cardImg.src = `images/${card}.png`;  
        cardImg.alt = card;                  
        cardImg.style.width = "50px";        
        cardImg.style.margin = "5px";        
        cardsEL.appendChild(cardImg);
    });

    // Update the sum
    sumEl.textContent = "Sum: " + sum;

    // Update the message
    if (sum < 21 && isAlive) {
        message = "Do you want to draw a new card?";
    } else if (sum === 21) {
        message = "Wohoo, You've got Blackjack!";
    } else if (sum > 21) {
        message = "You're out of the game!";
    }

    messageEL.textContent = message;
    playerEl.textContent = player.balance + ": $" + player.chips;
}