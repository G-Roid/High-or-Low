// global variables
let choice; 

// Play again button - fetch new deck -> start new game
document.querySelector('#playAgain').addEventListener('click', newDeck)

// check unique for unique deck id
if (!localStorage.getItem('deckId')) {
    newDeck()    
    
}

if (!localStorage.getItem('bank')) {
    localStorage.setItem('bank', 100)
}

// display bank amount
document.querySelector('#bankDisplay').textContent = `$ ${localStorage.getItem('bank')}` 


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

    let newBalance = localStorage.getItem('bank') - 10;
    
    
    fetch(`https://deckofcardsapi.com/api/deck/${localStorage.getItem('deckId')}/draw/?count=2`)
    .then(res => res.json())
    .then(data=> {
        console.log(data)
        console.log(`current data: ${data.remaining}`)

        if (data.remaining === 48 || localStorage.getItem('bank') === 0) {
            document.querySelector('h1').textContent = 'Game Over!'
        } 

        // Get card values
        let cardAImage = document.querySelector('#player1Card').src = data.cards[0].image;
        let cardBImage = document.querySelector('#player2Card').src = data.cards[1].image;

                

        // compare results
        let result = compare(data.cards[0].value, data.cards[1].value)
        if( (result == 1 && choice === 'High') || (result == 2 && choice === 'Low') ||
        (result == 0 && choice === 'Same') ) {
            document.querySelector('h4').textContent = 'Correct!'

            newBalance += 100;


        }  else {
            document.querySelector('h4').textContent = 'Wrong...'
        }

        localStorage.setItem('bank', newBalance);
        console.log('meaty')

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
        localStorage.setItem('bank', 100)        

    })
    .catch(err => {
        console.log(`error: ${err}`)
    })      
}


function checkGameOver(a, b) {
    (a == null || b == null) ? true : false;
}