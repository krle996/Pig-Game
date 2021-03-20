/*
YOUR 3 CODING CHALLENGES
Change the game to follow these rules:

1. A player looses his ENTIRE score when he rolls two 6 in a row. After that, it's the next player's turn.
(Hint: Always save the previous dice roll in a separate variable)
2. Add an input field to thr HTML where players can set the winning score, so that they can change the predefined
score of 100. (Hint: You can read that value with the .value property in JavaScript. This is a good oportunity to use
Google to figure this out)
3. Add another dice to the game, so that there are two dices now. The player looses his current score when one of them
is a 1. (Hint: You will need CSS to position the second dice, so take a look at the CSS code for the first one.)
*/

let scores, roundScore, activePlayer, gamePlaying;

init();

let lastDice;

document.querySelector('.btn--roll').addEventListener('click', function() {
    if(gamePlaying) {
    // Random number
    let dice1 = Math.floor(Math.random() * 6 + 1);
    let dice2 = Math.floor(Math.random() * 6 + 1);
    // Display the result
    document.getElementById('dice--1').style.display = 'block';
    document.getElementById('dice--2').style.display = 'block';
    document.getElementById('dice--1').src = 'img/dice-' + dice1 + '.png';
    document.getElementById('dice--2').src = 'img/dice-' + dice2 + '.png';

    if(dice1 !== 1 && dice2 !== 1) {
        // Add score
        roundScore += dice1 + dice2;
        // Display roundScore
        document.querySelector('#current--' + activePlayer).textContent = roundScore;
    }
    else {
        // Next player
        nextPlayer();
    }

    /*
    // Delete score if player rolls two 6 in a row
    if(dice === 6 && lastDice === 6) {
        // Player loses score
        scores[activePlayer] = 0;
        document.querySelector('#score--' + activePlayer).textContent = '0';
        // Next player turn
        nextPlayer();
    // Update the round score IF the rolled number was NOT a 1
    }
    else if(dice !== 1) {
        // Add score
        roundScore += dice;
        // Display roundScore
        document.querySelector('#current--' + activePlayer).textContent = roundScore;
    }
    else {
        // Next player
        nextPlayer();
    }

    lastDice = dice;
    */
    }
});

document.querySelector('.btn--hold').addEventListener('click', function() {
    if(gamePlaying) {
    // Add current score to GLOBAL score
    scores[activePlayer] += roundScore;
    // Update the UI
    document.querySelector('#score--' + activePlayer).textContent = scores[activePlayer];
    // Create final score
    let finalScore = document.querySelector('.final--score').value;
    let winningScore;
    // Undefined, 0, null, or '' are COERCED to false
    if(finalScore) {
        winningScore = finalScore;
    }
    else {
        winningScore = 100;
    }

    // Check if player won the game
    if(scores[activePlayer] >= winningScore) {
        document.querySelector('#name--' + activePlayer).textContent = 'Winner!';
        hideDice();
        document.querySelector('.player--' + activePlayer).classList.add('player--winner');
        document.querySelector('.player--' + activePlayer).classList.remove('active');
        gamePlaying = false;
    }
    else {
    // Next player
    nextPlayer();
    }
    }
});

function nextPlayer() {
    // Next player
    activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;
    roundScore = 0;

    document.getElementById('current--0').textContent = '0';
    document.getElementById('current--1').textContent = '0';

    document.querySelector('.player--0').classList.toggle('player--active');
    document.querySelector('.player--1').classList.toggle('player--active');

    hideDice();
}

document.querySelector('.btn--new').addEventListener('click', init);

function init() {
    scores = [0,0];
    roundScore = 0;
    activePlayer = 0;
    gamePlaying = true;

    hideDice();

    document.getElementById('score--0').textContent = '0';
    document.getElementById('score--1').textContent = '0';
    document.getElementById('current--0').textContent = '0';
    document.getElementById('current--1').textContent = '0';
    document.getElementById('name--0').textContent = 'Player 1';
    document.getElementById('name--1').textContent = 'Player 2';
    document.querySelector('.player--0').classList.remove('active');
    document.querySelector('.player--1').classList.remove('active');
    document.querySelector('.player--0').classList.add('active');
    document.querySelector('.player--0').classList.remove('player--winner');
    document.querySelector('.player--1').classList.remove('player--winner');
}

function hideDice() {
    document.getElementById('dice--1').style.display = 'none';
    document.getElementById('dice--2').style.display = 'none';
}

