// check unique for unique deck id
if (!localStorage.getItem('deckId')) {

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

if (!localStorage.getItem('playerScore')) {
    localStorage.setItem('playerScore', 0) 
}


//Drawing cards
document.querySelector('button').addEventListener('click', deal);

function deal() {

    let currentScore = localStorage.getItem('playerScore')
    console.log(currentScore)


    fetch(`https://deckofcardsapi.com/api/deck/${localStorage.getItem('deckId')}/draw/?count=2`)
    .then(res => res.json())
    .then(data=> {
        console.log(data)

        document.querySelector('#player1Card').src = data.cards[0].image;
        document.querySelector('#player2Card').src = data.cards[1].image;

        let result = compare(data.cards[0].value, data.cards[1].value)
        if(result == 1) {
            document.querySelector('h3').textContent = 'Player 1 Wins'



            
        } else if (result == 2) {
            document.querySelector('h3').textContent = 'Player 2 Wins'
        } else {
            document.querySelector('h3').textContent = 'War'
        }

        document.querySelector('h3').t
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