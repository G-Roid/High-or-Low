// global variables
let choice;

// Play again button - fetch new deck -> start new game
document.querySelector('#playAgain').addEventListener('click', newDeck)


// check unique for unique deck id
if (!localStorage.getItem('deckId')) {
    newDeck()

    // fetch('https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1')
    // .then(res => res.json())
    // .then(data=> {
    //     console.log(data)

    //     localStorage.setItem('deckId', data.deck_id)

        
    // })
    // .catch(err => {
    //     console.log(`error: ${err}`)
    // })        
    
}

if (!localStorage.getItem('playerScore')) {
    localStorage.setItem('playerScore', 0) 
}


//Drawing cards
document.querySelectorAll('button').forEach(item => {
    console.log(item.id)
    
    if (item.id !== 'playAgain') {
        item.addEventListener('click', deal)
    }
});

document.querySelector('#high-btn').addEventListener('click', e => {

    choice = e.target.textContent;
})

document.querySelector('#low-btn').addEventListener('click', e => {

    choice = e.target.textContent;

})

document.querySelector('#same-btn').addEventListener('click', e => {

    choice = e.target.textContent;
})



function deal() {

    let currentScore = localStorage.getItem('playerScore')


    fetch(`https://deckofcardsapi.com/api/deck/${localStorage.getItem('deckId')}/draw/?count=2`)
    .then(res => res.json())
    .then(data=> {
        console.log(data)

        // Get card values
        document.querySelector('#player1Card').src = data.cards[0].image;
        document.querySelector('#player2Card').src = data.cards[1].image;

        // compare results
        let result = compare(data.cards[0].value, data.cards[1].value)
        if( (result == 1 && choice === 'High') || (result == 2 && choice === 'Low') ||
        (result == 0 && choice === 'Same') ) {
            document.querySelector('h3').textContent = 'Correct!'
        }  else {
            document.querySelector('h3').textContent = 'Wrong...'
        }

    })

    .catch(err => {
        console.log(`error: ${err}`)
    })
}

function compare(num1, num2) {
    
    num1 = convertRoyal(num1);
    num2 = convertRoyal(num2);

    if (num1 > num2) {
        return 1;
    } else if (num1 < num2) {
        return 2
    } else {
        return 0
    }
}

function convertRoyal(card) {
    if(card === 'JACK') {
        return 11;
    } else if (card === 'QUEEN') {
        return 12;
    } else if (card === 'KING') {
        return 13;
    } else if (card === 'ACE') {
        return 14;
    }
    else {
        return Number(card)
    }
    
}

function newDeck() {

    fetch('https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1')
    .then(res => res.json())
    .then(data=> {
        console.log(data)

        localStorage.setItem('deckId', data.deck_id)

    })
    .catch(err => {
        console.log(`error: ${err}`)
    })      
}