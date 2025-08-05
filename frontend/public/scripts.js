/*
 * Pokemon Database Frontend JavaScript
 * Handles all form submissions, data display, and table refreshing
 */

// ==================== DATABASE CONNECTION ====================

async function checkDbConnection() {
    const statusElem = document.getElementById('dbStatus');
    const loadingGifElem = document.getElementById('loadingGif');

    const response = await fetch('/check-db-connection', {
        method: "GET"
    });

    loadingGifElem.style.display = 'none';
    statusElem.style.display = 'inline';

    response.text()
    .then((text) => {
        statusElem.textContent = text;
    })
    .catch((error) => {
        statusElem.textContent = 'connection timed out';
    });
}

async function resetDemotable() {
    const response = await fetch("/initiate-demotable", {
        method: 'POST'
    });
    const responseData = await response.json();

    if (responseData.success) {
        const messageElement = document.getElementById('resetResultMsg');
        messageElement.textContent = "Pokemon database initiated successfully!";
        alert("Database reset successful!");
        setTimeout(refreshAllTables, 1000); // Refresh tables after reset
    } else {
        alert("Error initiating database!");
    }
}

// ==================== TABLE DISPLAY FUNCTIONS ====================

async function fetchAndDisplayTrainers() {
    const tableElement = document.getElementById('trainersTable');
    const tableBody = tableElement.querySelector('tbody');

    const response = await fetch('/trainers', { method: 'GET' });
    const responseData = await response.json();
    const trainersContent = responseData.data;

    if (tableBody) {
        tableBody.innerHTML = '';
    }

    trainersContent.forEach(trainer => {
        const row = tableBody.insertRow();
        trainer.forEach((field, index) => {
            const cell = row.insertCell(index);
            cell.textContent = field || 'NULL';
        });
    });
}

async function fetchAndDisplayPlayers() {
    const tableElement = document.getElementById('playersTable');
    const tableBody = tableElement.querySelector('tbody');

    const response = await fetch('/players', { method: 'GET' });
    const responseData = await response.json();
    const playersContent = responseData.data;

    if (tableBody) {
        tableBody.innerHTML = '';
    }

    playersContent.forEach(player => {
        const row = tableBody.insertRow();
        player.forEach((field, index) => {
            const cell = row.insertCell(index);
            cell.textContent = field || 'NULL';
        });
    });
}

async function fetchAndDisplayPokemon() {
    const tableElement = document.getElementById('pokemonTable');
    const tableBody = tableElement.querySelector('tbody');

    const response = await fetch('/pokemon', { method: 'GET' });
    const responseData = await response.json();
    const pokemonContent = responseData.data;

    if (tableBody) {
        tableBody.innerHTML = '';
    }

    pokemonContent.forEach(pokemon => {
        const row = tableBody.insertRow();
        pokemon.forEach((field, index) => {
            const cell = row.insertCell(index);
            cell.textContent = field || 'NULL';
        });
    });
}

async function fetchAndDisplayLearnedMoves() {
    const tableElement = document.getElementById('learnedMovesTable');
    const tableBody = tableElement.querySelector('tbody');

    const response = await fetch('/learned-moves', { method: 'GET' });
    const responseData = await response.json();
    const movesContent = responseData.data;

    if (tableBody) {
        tableBody.innerHTML = '';
    }

    movesContent.forEach(move => {
        const row = tableBody.insertRow();
        move.forEach((field, index) => {
            const cell = row.insertCell(index);
            cell.textContent = field || 'NULL';
        });
    });
}

async function fetchAndDisplaySpecies() {
    const tableElement = document.getElementById('speciesTable');
    const tableBody = tableElement.querySelector('tbody');

    const response = await fetch('/species', { method: 'GET' });
    const responseData = await response.json();
    const speciesContent = responseData.data;

    if (tableBody) {
        tableBody.innerHTML = '';
    }

    speciesContent.forEach(species => {
        const row = tableBody.insertRow();
        species.forEach((field, index) => {
            const cell = row.insertCell(index);
            cell.textContent = field || 'NULL';
        });
    });
}

async function fetchAndDisplayMoves() {
    const tableElement = document.getElementById('movesTable');
    const tableBody = tableElement.querySelector('tbody');

    const response = await fetch('/moves', { method: 'GET' });
    const responseData = await response.json();
    const movesContent = responseData.data;

    if (tableBody) {
        tableBody.innerHTML = '';
    }

    movesContent.forEach(move => {
        const row = tableBody.insertRow();
        move.forEach((field, index) => {
            const cell = row.insertCell(index);
            cell.textContent = field || 'NULL';
        });
    });
}

async function fetchAndDisplayAbilities() {
    const tableElement = document.getElementById('abilitiesTable');
    const tableBody = tableElement.querySelector('tbody');

    const response = await fetch('/abilities', { method: 'GET' });
    const responseData = await response.json();
    const abilitiesContent = responseData.data;

    if (tableBody) {
        tableBody.innerHTML = '';
    }

    abilitiesContent.forEach(ability => {
        const row = tableBody.insertRow();
        ability.forEach((field, index) => {
            const cell = row.insertCell(index);
            cell.textContent = field || 'NULL';
        });
    });
}

async function fetchAndDisplayNatures() {
    const tableElement = document.getElementById('naturesTable');
    const tableBody = tableElement.querySelector('tbody');

    const response = await fetch('/natures', { method: 'GET' });
    const responseData = await response.json();
    const naturesContent = responseData.data;

    if (tableBody) {
        tableBody.innerHTML = '';
    }

    naturesContent.forEach(nature => {
        const row = tableBody.insertRow();
        nature.forEach((field, index) => {
            const cell = row.insertCell(index);
            cell.textContent = field || 'NULL';
        });
    });
}

// Master function to refresh all tables
function refreshAllTables() {
    fetchAndDisplayTrainers();
    fetchAndDisplayPlayers();
    fetchAndDisplayPokemon();
    fetchAndDisplayLearnedMoves();
    fetchAndDisplaySpecies();
    fetchAndDisplayMoves();
    fetchAndDisplayAbilities();
    fetchAndDisplayNatures();
}

// ==================== INSERT FUNCTIONS ====================

async function insertTrainer(event) {
    event.preventDefault();

    const trainerIdValue = document.getElementById('insertTrainerId').value;
    const nameValue = document.getElementById('insertTrainerName').value;
    const locationValue = document.getElementById('insertTrainerLocation').value;

    const response = await fetch('/insert-trainer', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            trainerId: trainerIdValue,
            name: nameValue,
            locationName: locationValue || null
        })
    });

    const responseData = await response.json();
    const messageElement = document.getElementById('insertTrainerResultMsg');

    if (responseData.success) {
        alert("Trainer inserted successfully!");
        messageElement.textContent = "Trainer inserted successfully!";
        document.getElementById('insertTrainer').reset();
        refreshAllTables(); // Refresh all tables to show changes
    } else {
        alert("Error inserting trainer! Check your input.");
        messageElement.textContent = "Error inserting trainer!";
    }
}

async function insertPlayer(event) {
    event.preventDefault();

    const trainerIdValue = document.getElementById('insertPlayerTrainerId').value;
    const moneyValue = document.getElementById('insertPlayerMoney').value;

    const response = await fetch('/insert-player', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            trainerId: trainerIdValue,
            money: moneyValue
        })
    });

    const responseData = await response.json();
    const messageElement = document.getElementById('insertPlayerResultMsg');

    if (responseData.success) {
        alert("Player inserted successfully!");
        messageElement.textContent = "Player inserted successfully!";
        document.getElementById('insertPlayer').reset();
        refreshAllTables(); // Refresh all tables to show changes
    } else {
        alert("Error inserting player! Make sure trainer exists.");
        messageElement.textContent = "Error inserting player!";
    }
}

async function insertPokemon(event) {
    event.preventDefault();

    const pokedexValue = document.getElementById('insertPokemonPokedex').value;
    const pokemonIdValue = document.getElementById('insertPokemonId').value;
    const nameValue = document.getElementById('insertPokemonName').value;
    const xpValue = document.getElementById('insertPokemonXP').value;
    const natureValue = document.getElementById('insertPokemonNature').value;
    const hpIvValue = document.getElementById('insertPokemonHPIV').value;
    const attackIvValue = document.getElementById('insertPokemonAttackIV').value;
    const defenseIvValue = document.getElementById('insertPokemonDefenseIV').value;
    const speedIvValue = document.getElementById('insertPokemonSpeedIV').value;
    const abilityIdValue = document.getElementById('insertPokemonAbilityId').value;
    const trainerIdValue = document.getElementById('insertPokemonTrainerId').value;

    const response = await fetch('/insert-pokemon', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            pokedex: pokedexValue,
            pokemon_id: pokemonIdValue,
            name: nameValue,
            total_XP: xpValue,
            nature: natureValue,
            HP_IV: hpIvValue,
            attack_IV: attackIvValue,
            defense_IV: defenseIvValue,
            speed_IV: speedIvValue,
            ability_id: abilityIdValue,
            trainer_id: trainerIdValue || null
        })
    });

    const responseData = await response.json();
    const messageElement = document.getElementById('insertPokemonResultMsg');

    if (responseData.success) {
        alert("Pokemon inserted successfully!");
        messageElement.textContent = "Pokemon inserted successfully!";
        document.getElementById('insertPokemon').reset();
        refreshAllTables(); // Refresh all tables to show changes
    } else {
        alert("Error inserting Pokemon! Check your input values.");
        messageElement.textContent = "Error inserting Pokemon!";
    }
}

async function insertLearnedMove(event) {
    event.preventDefault();

    const pokedexValue = document.getElementById('insertLearnedMovePokedex').value;
    const pokemonIdValue = document.getElementById('insertLearnedMovePokemonId').value;
    const moveIdValue = document.getElementById('insertLearnedMoveId').value;

    const response = await fetch('/insert-learned-move', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            pokedex: pokedexValue,
            pokemon_id: pokemonIdValue,
            move_id: moveIdValue
        })
    });

    const responseData = await response.json();
    const messageElement = document.getElementById('insertLearnedMoveResultMsg');

    if (responseData.success) {
        alert("Move taught successfully!");
        messageElement.textContent = "Move taught successfully!";
        document.getElementById('insertLearnedMove').reset();
        refreshAllTables(); // Refresh all tables to show changes
    } else {
        alert("Error teaching move! Make sure Pokemon and Move exist.");
        messageElement.textContent = "Error teaching move!";
    }
}

// ==================== PAGE INITIALIZATION ====================

window.onload = function() {
    // Initialize page
    checkDbConnection();
    refreshAllTables(); // Load all tables on page load
    
    // Set up event listeners
    document.getElementById("resetDemotable").addEventListener("click", resetDemotable);
    document.getElementById("insertTrainer").addEventListener("submit", insertTrainer);
    document.getElementById("insertPlayer").addEventListener("submit", insertPlayer);
    document.getElementById("insertPokemon").addEventListener("submit", insertPokemon);
    document.getElementById("insertLearnedMove").addEventListener("submit", insertLearnedMove);
};