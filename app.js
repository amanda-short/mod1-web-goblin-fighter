/* Imports */

/* Get DOM Elements */
const scoreboard = document.getElementById('scoreboard');
const resultDisplay = document.getElementById('result-display');
const playerHP = document.getElementById('player-hp');
const playerImage = document.getElementById('player-image');
const addWitchForm = document.getElementById('add-witch-form');
const witchList = document.getElementById('witch-list');
const removeButton = document.getElementById('remove-button');

/* State */
let player = {
    hp: 10,
    type: 'player',
};

let witches = [
    {
        name: 'Winifred'
        type: 'Witch'
        hp: 2,
    },
    {
        name: 'Sarah'
        type: 'Witch'
        hp: 3,
    },
    {
        name: 'Mary'
        type: 'Witch'
        hp: 4,
    },
];

// witch types
const witch = {
    type: 'witch',
    hp: 3,
};

/* Events */


/* Display Functions */
function displayResult() {
    resultDisplay.textContent = result;
}

function displayScoreboard() {
    scoreboard.textContent = 'Your spells worked! You defeated ${defeated} witches!';
}

function displayPlayer() {
    playerHP.textContent = Math.max(0, player.hp);
    if (player.hp < 1) {
        playerImage.src = '/assets/witch1.png';
    } else {
        playerImage.src = '/assets/witch2.png';
    }
}

function displayWitches() {
    witchList.innerHTML = '';

    for (const witch of witches) {
        const witchEl = renderWitch(witch);
        witchList.append(witchEl);

        witchEl.addEventListener('click', () => {
            if (witch.hp < 1) {
                result = 'You already beat them.';
                displayResult();
                return;
            }



        })
    }
}


// (don't forget to call any display functions you want to run on page load!)
displayPlayer();
displayWitches();