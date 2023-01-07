/* fetch('https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1',{mode: 'cors'})
    .then(response => response.json()
        .then(data => console.log(data)))
        .catch(erro => console.log('Erro data Json: ' + erro.message))
.catch(erro => console.log('Erro response Fetch: ' + erro.message)) */

/* const showData = (result) => {
    //console.log(result.deck_id)    dot notation
    //const {deck_id} = result       desestruturação
    //console.log(deck_id)      
    //for (const key in result){console.log(key,result[key])}     for in iteração de objetos
        
} */

/* fetch('https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1',{mode: 'cors'})
    .then(response => response.json()
        .then(data => {
            //console.log(data)
            //showData(data)
        }))
        .catch(erro => console.log('Erro data Json: ' + erro.message))
.catch(erro => console.log('Erro response Fetch: ' + erro.message)) */


let deckId
let totalDealer = 0
let totalPlayer = 0
let buttonStart = document.querySelector('.start')
let buttonStand = document.querySelector('.stand')
let buttonHit = document.querySelector('.hit')
let buttonAgain = document.querySelector('.again')
let dealerContainer = document.querySelector('.dealerContainer')
let playerContainer = document.querySelector('.playerContainer')
let warning = document.querySelector('.warning')
let warningPlay = document.querySelector('.play')
let warningBust = document.querySelector('.bust')
let buttonsContainer = document.querySelector('.buttonsContainer')

async function getDeck() {
    const deckUrl = 'https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1'
    const response = await fetch(deckUrl,{mode:'cors'})
    const deckDetails = await response.json()
    deckId = deckDetails.deck_id
}
getDeck()

async function getCards() {
    warningPlay.style.display = 'none'
    buttonsContainer.style.display = 'block'
    const cardsUrl = `https://deckofcardsapi.com/api/deck/${deckId}/draw/?count=4`
    const response = await fetch(cardsUrl,{mode:'cors'})
    const cardsDetails = await response.json()
    const cards = cardsDetails.cards
    
    dealerContainer.innerHTML += `<img src='${cards[0].image}' class='card'>`
    //dealerContainer.innerHTML += `<img src='${cards[1].image}' class='card'>`
    dealerContainer.innerHTML += `<img src='./cardback.png' class='card cardback'>`
    playerContainer.innerHTML += `<img src='${cards[2].image}' class='card'>`
    playerContainer.innerHTML += `<img src='${cards[3].image}' class='card'>`
    
    for (let index = 0; index < cards.length; index++) {
        let value = cards[index].code.charAt(0)
        console.log('Jogo iniciado, cartas distribuídas')
        if(value == '0' || value == 'J' || value == 'Q' || value == 'K'){
            if(index == 0 || index == 1){
                totalDealer = totalDealer + 10
            }else{
                totalPlayer = totalPlayer + 10
            }
        }else if (value == 'A'){
            if(index == 0 || index == 1){
                totalDealer = totalDealer + 11
            }else{
                totalPlayer = totalPlayer + 11
            }
        }else {
            if(index == 0 || index == 1){
                totalDealer = totalDealer + parseInt(value)
            }else{
                totalPlayer = totalPlayer + parseInt(value)
            }
        }
        
    }

    console.log('total dealer = ' + totalDealer)
    console.log('total player = ' + totalPlayer)

}


function removeCards(){
    while(playerContainer.hasChildNodes()){
        playerContainer.removeChild(playerContainer.firstChild)
    }
    while(dealerContainer.hasChildNodes()){
        dealerContainer.removeChild(dealerContainer.firstChild)
    }
    totalDealer = 0
    totalPlayer = 0
}

buttonStart.onclick = ()=>{
    getCards()
}

buttonHit.onclick = async function(){

    const cardsUrl = `https://deckofcardsapi.com/api/deck/${deckId}/draw/?count=1`
    const response = await fetch(cardsUrl,{mode:'cors'})
    const cardsDetails = await response.json()
    const cards = cardsDetails.cards

    playerContainer.innerHTML += `<img src='${cards[0].image}' class='card'>`

    let value = cards[0].code.charAt(0)
    console.log('Player pediu uma carta')
    if(value == '0' || value == 'J' || value == 'Q' || value == 'K'){
            totalPlayer = totalPlayer + 10
    }else if (value == 'A'){
        if(totalPlayer<21){
            totalPlayer = totalPlayer + 11
        }else{
            totalPlayer = totalPlayer + 1
        }
    }else {
            totalPlayer = totalPlayer + parseInt(value)
    }

    console.log('total dealer = ' + totalDealer)
    console.log('total player = ' + totalPlayer)

    if (totalPlayer > 21){
        warningBust.style.display = 'block'
        buttonsContainer.style.display = 'none'
    }    
}


buttonAgain.onclick = ()=>{
    warningBust.style.display = 'none'
    removeCards()
    getDeck()
    getCards()
}

buttonStand.onclick = ()=>{

}


