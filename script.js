

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
let cards
let buttonStart = document.querySelector('.start')
let buttonStand = document.querySelector('.stand')
let buttonHit = document.querySelector('.hit')
let dealerContainer = document.querySelector('.dealerContainer')
let playerContainer = document.querySelector('.playerContainer')
let warningPlay = document.querySelector('.warning')
let buttonsContainer = document.querySelector('.buttonsContainer')

async function getDeck() {
    const deckUrl = 'https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1'
    const response = await fetch(deckUrl,{mode:'cors'})
    const deckDetails = await response.json()
    deckId = deckDetails.deck_id
    //console.log(deckId)
}
getDeck()

buttonStart.onclick = async function () {
    warningPlay.style.display = 'none'
    buttonsContainer.style.display = 'block'
    const cardsUrl = `https://deckofcardsapi.com/api/deck/${deckId}/draw/?count=3`
    const response = await fetch(cardsUrl,{mode:'cors'})
    const cardsDetails = await response.json()

    const cardsDealer = cardsDetails.cards

    dealerContainer.innerHTML += `<img src='${cardsDealer[0].image}' class='card'>`
    dealerContainer.innerHTML += `<img src='./cardback.png' class='card cardback'>`
    playerContainer.innerHTML += `<img src='${cardsDealer[1].image}' class='card'>`
    playerContainer.innerHTML += `<img src='${cardsDealer[2].image}' class='card'>`

    //playerContainer.innerHTML += `<img src='${card.image}' class='card'>`

}
