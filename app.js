/* Imports */
import { renderWitch } from './render-utils.js';
import { getRandomItem } from './utils.js';

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

let result = '';
let defeated = 0;

let witches = [
    {
        name: 'Winifred',
        type: 'Witch',
        hp: 2,
    },
    {
        name: 'Sarah',
        type: 'Witch',
        hp: 3,
    },
    {
        name: 'Mary',
        type: 'Witch',
        hp: 4,
    },
];

// witch types
const witch = {
    type: 'witch',
    hp: 3,    
};

const wizard = {
    type: 'wizard',
    hp: 2,
};

const playerAttacks = [0, 1, 1, 2, 2, 3, 3, 4, 4];
const witchAttacks = [0, 0, 1, 1, 2, 2, 3];
const witchTypes = [
    witch, 
    witch, 
    witch, 
    wizard,
    wizard,
    wizard,
];

/* Events */
addWitchForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const witchType = getRandomItem(witchTypes);

    const witch = {
        name: FormData.get('name'),
        type: witchType.type,
        hp: witchType.hp,
    };
    witches.push(witch);
});

removeButton.addEventListener('click', () => {
    const alive = [];

    for (const witch of witches) {
        if (witch.hp > 0) {
            alive.push(witch);
        }
    }
    witches = alive;
    displayWitches();
});


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
            const playerAttack = getRandomItem(playerAttacks);
            const witchAttack = getRandomItem(witchAttacks);

            player.hp = Math.max(0, player.hp - witchAttack);
            witch.hp = Math.max(0, witch.hp - playerAttack);

            result = '';
            if (playerAttack === 0) {
                result += 'Your spell failed.';
            } else {
                result += `It worked! You beat ${witch.name} and did ${playerAttack} in damage. `;
            }

            if (witchAttack === 0) {
                result += `${witch.name}'s spell failed.`;
            } else {
                result += `${witch.name}'s spell was successful and and did ${witchAttack} in damage.`;
            }

            if (witch.hp < 1) {
                defeated++;
                displayScoreboard();
            }

            displayResult();
            displayPlayer();
            displayWitches();


        });
    }
}


// (don't forget to call any display functions you want to run on page load!)
displayPlayer();
displayWitches();