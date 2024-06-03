window.addEventListener('beforeunload', function() {
    localStorage.removeItem("chips");
});

let player = {
    name: "Stephen",
    chips: localStorage.getItem("chips") ? parseInt(localStorage.getItem("chips")) : 150
}

let cards = []
let sum = 0
let totalChips = player.chips 
let isAlive = false
let hasBlackJack = false
let message = ""

let PlayerEl = document.getElementById("player-el")
let CardsEl = document.getElementById("cards-el")
let SumEl = document.getElementById("sum-el")
let MessageEl = document.getElementById("message-el")
let BlackjackImg = document.getElementById("blackjack-img")

PlayerEl.textContent = player.name + ": " + "$" + player.chips

function getRandomCard(){
    let randomNumber = Math.floor( Math.random()*13) +1
    if (randomNumber > 10){
        return 10
    } else if(randomNumber === 1){
        return 11
    } else {
        return randomNumber
    }
}

function startGame(){
    isAlive = true
    hasBlackJack = false 
    let firstCard = getRandomCard()
    let secondCard = getRandomCard()
    cards = [firstCard, secondCard]
    sum = firstCard + secondCard
    renderGame()
    PlayerEl.textContent = player.name + ": " + "$" + totalChips 
    
}

function renderGame(){
    CardsEl.textContent = "Cards: "
    for(i = 0; i < cards.length; i++){
        CardsEl.textContent += cards[i] + " "
    }
    SumEl.textContent = "Sum: " + sum
    if (sum <= 20){
        message = "Do you want to draw a new card?"
        BlackjackImg.style.display = "none";
    } else if (sum === 21){
        message = "You've got Blackjack!"
        hasBlackJack = true
        BlackjackImg.style.display = "block";
        chipsStash()
    } else {
        message = "You're out of the game!"
        isAlive = false
        chipsStash()
    }
    MessageEl.textContent = message
}

function newCard(){
    if (isAlive === true && hasBlackJack === false){
        let card = getRandomCard()
        sum += card
        cards.push(card)
        renderGame()
    }
}

function chipsStash(){
    if(hasBlackJack === true){
        let won = 10
        totalChips += won
        localStorage.setItem("chips", totalChips)
        PlayerEl.textContent = player.name + ": " + "$" + totalChips
    } else if(isAlive === false) {
        let lose = 15
        totalChips -= lose
        localStorage.setItem("chips", totalChips)
        PlayerEl.textContent = player.name + ": " + "$" + totalChips
    }
}
