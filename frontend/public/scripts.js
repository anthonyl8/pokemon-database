/*
 * Pokemon Database Frontend JavaScript
 * Handles all form submissions, data display, and table refreshing
 */

// ==================== SYSTEM FUNCTIONS ====================

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

        setTimeout(refreshAllTables, 2000);
    } else {
        alert("Error initiating database!");
    }
}

// ==================== TABLE DISPLAY FUNCTIONS ====================

async function fetchAndDisplayTrainers() {
    fetchAndDisplay('trainersTable', '/trainers');
    // const tableElement = document.getElementById('trainersTable');
    // const tableBody = tableElement.querySelector('tbody');

    // const response = await fetch('/trainers', { method: 'GET' });
    // const responseData = await response.json();
    // const trainersContent = responseData.data;

    // if (tableBody) {
    //     tableBody.innerHTML = '';
    // }

    // trainersContent.forEach(trainer => {
    //     const row = tableBody.insertRow();
    //     trainer.forEach((field, index) => {
    //         const cell = row.insertCell(index);
    //         cell.textContent = field || 'NULL';
    //     });
    // });
}

async function fetchAndDisplayPlayers() {
    fetchAndDisplay('playersTable', '/players');
    // const tableElement = document.getElementById('playersTable');
    // const tableBody = tableElement.querySelector('tbody');

    // const response = await fetch('/players', { method: 'GET' });
    // const responseData = await response.json();
    // const playersContent = responseData.data;

    // if (tableBody) {
    //     tableBody.innerHTML = '';
    // }

    // playersContent.forEach(player => {
    //     const row = tableBody.insertRow();
    //     player.forEach((field, index) => {
    //         const cell = row.insertCell(index);
    //         cell.textContent = field || 'NULL';
    //     });
    // });
}

async function fetchAndDisplayPokemon() {
    fetchAndDisplay('pokemonTable', '/pokemon');
    // const tableElement = document.getElementById('pokemonTable');
    // const tableBody = tableElement.querySelector('tbody');

    // const response = await fetch('/pokemon', { method: 'GET' });
    // const responseData = await response.json();
    // const pokemonContent = responseData.data;

    // if (tableBody) {
    //     tableBody.innerHTML = '';
    // }

    // pokemonContent.forEach(pokemon => {
    //     const row = tableBody.insertRow();
    //     pokemon.forEach((field, index) => {
    //         const cell = row.insertCell(index);
    //         cell.textContent = field || 'NULL';
    //     });
    // });
}

async function fetchAndDisplayLearnedMoves() {
    fetchAndDisplay('learnedMovesTable', '/learned-moves');
    // const tableElement = document.getElementById('learnedMovesTable');
    // const tableBody = tableElement.querySelector('tbody');

    // const response = await fetch('/learned-moves', { method: 'GET' });
    // const responseData = await response.json();
    // const movesContent = responseData.data;

    // if (tableBody) {
    //     tableBody.innerHTML = '';
    // }

    // movesContent.forEach(move => {
    //     const row = tableBody.insertRow();
    //     move.forEach((field, index) => {
    //         const cell = row.insertCell(index);
    //         cell.textContent = field || 'NULL';
    //     });
    // });
}

async function fetchAndDisplaySpecies() {
    fetchAndDisplay('speciesTable', '/species');
    // const tableElement = document.getElementById('speciesTable');
    // const tableBody = tableElement.querySelector('tbody');

    // const response = await fetch('/species', { method: 'GET' });
    // const responseData = await response.json();
    // const speciesContent = responseData.data;

    // if (tableBody) {
    //     tableBody.innerHTML = '';
    // }

    // speciesContent.forEach(species => {
    //     const row = tableBody.insertRow();
    //     species.forEach((field, index) => {
    //         const cell = row.insertCell(index);
    //         cell.textContent = field || 'NULL';
    //     });
    // });
}

async function fetchAndDisplayMoves() {
    fetchAndDisplay('movesTable', '/moves');
    // const tableElement = document.getElementById('movesTable');
    // const tableBody = tableElement.querySelector('tbody');

    // const response = await fetch('/moves', { method: 'GET' });
    // const responseData = await response.json();
    // const movesContent = responseData.data;

    // if (tableBody) {
    //     tableBody.innerHTML = '';
    // }

    // movesContent.forEach(move => {
    //     const row = tableBody.insertRow();
    //     move.forEach((field, index) => {
    //         const cell = row.insertCell(index);
    //         cell.textContent = field || 'NULL';
    //     });
    // });
}

async function fetchAndDisplayAbilities() {
    fetchAndDisplay('abilitiesTable', '/abilities');
    // const tableElement = document.getElementById('abilitiesTable');
    // const tableBody = tableElement.querySelector('tbody');

    // const response = await fetch('/abilities', { method: 'GET' });
    // const responseData = await response.json();
    // const abilitiesContent = responseData.data;

    // if (tableBody) {
    //     tableBody.innerHTML = '';
    // }

    // abilitiesContent.forEach(ability => {
    //     const row = tableBody.insertRow();
    //     ability.forEach((field, index) => {
    //         const cell = row.insertCell(index);
    //         cell.textContent = field || 'NULL';
    //     });
    // });
}

async function fetchAndDisplayNatures() {
    fetchAndDisplay('naturesTable', '/natures');
    // const tableElement = document.getElementById('naturesTable');
    // const tableBody = tableElement.querySelector('tbody');

    // const response = await fetch('/natures', { method: 'GET' });
    // const responseData = await response.json();
    // const naturesContent = responseData.data;

    // if (tableBody) {
    //     tableBody.innerHTML = '';
    // }

    // naturesContent.forEach(nature => {
    //     const row = tableBody.insertRow();
    //     nature.forEach((field, index) => {
    //         const cell = row.insertCell(index);
    //         cell.textContent = field || 'NULL';
    //     });
    // });
}

async function fetchAndDisplay(tableId, endpoint) {
    const tableElement = document.getElementById(tableId);
    const tableBody = tableElement.querySelector('tbody');

    const response = await fetch(endpoint, { method: 'GET' });
    const responseData = await response.json();
    const content = responseData.data;

    if (tableBody) {
        tableBody.innerHTML = '';
    }

    content.forEach(tuple => {
        const row = tableBody.insertRow();
        tuple.forEach((field, index) => {
            const cell = row.insertCell(index);
            cell.textContent = field || 'NULL';
        });
    });
}

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
        refreshAllTables();
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
        refreshAllTables();
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
        refreshAllTables();
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
        refreshAllTables();
    } else {
        alert("Error teaching move! Make sure Pokemon and Move exist.");
        messageElement.textContent = "Error teaching move!";
    }
}

// ==================== DELETE FUNCTIONS ====================

async function deleteTrainer(event) {
    event.preventDefault();

    const trainerIdValue = document.getElementById('deleteTrainerId').value;

    const response = await fetch('/delete-trainer', {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ trainerId: trainerIdValue })
    });

    const responseData = await response.json();
    const messageElement = document.getElementById('deleteTrainerResultMsg');

    if (responseData.success) {
        alert("Trainer deleted successfully!");
        messageElement.textContent = "Trainer deleted successfully!";
        document.getElementById('deleteTrainer').reset();
        refreshAllTables();
    } else {
        alert("Error deleting trainer! Check your input.");
        messageElement.textContent = "Error deleting trainer!";
    }
}

async function deletePokemon(event) {
    event.preventDefault();

    const pokedexValue = document.getElementById('deletePokemonPokedex').value;
    const pokemonIdValue = document.getElementById('deletePokemonId').value;

    const response = await fetch('/delete-pokemon', {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            pokedex: pokedexValue,
            pokemon_id: pokemonIdValue
        })
    });

    const responseData = await response.json();
    const messageElement = document.getElementById('deletePokemonResultMsg');

    if (responseData.success) {
        alert("Pokemon deleted successfully!");
        messageElement.textContent = "Pokemon deleted successfully!";
        document.getElementById('deletePokemon').reset();
        refreshAllTables();
    } else {
        alert("Error deleting Pokemon! Check your input.");
        messageElement.textContent = "Error deleting Pokemon!";
    }
}

async function deleteLearnedMove(event) {
    event.preventDefault();

    const pokedexValue = document.getElementById('deleteLearnedMovePokedex').value;
    const pokemonIdValue = document.getElementById('deleteLearnedMovePokemonId').value;
    const moveIdValue = document.getElementById('deleteLearnedMoveId').value;

    const response = await fetch('/delete-learned-move', {
        method: 'DELETE',
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
    const messageElement = document.getElementById('deleteLearnedMoveResultMsg');

    if (responseData.success) {
        alert("Move removed successfully!");
        messageElement.textContent = "Move removed successfully!";
        document.getElementById('deleteLearnedMove').reset();
        refreshAllTables();
    } else {
        alert("Error removing move! Check your input.");
        messageElement.textContent = "Error removing move!";
    }
}

// ==================== UPDATE FUNCTIONS ====================

async function updateTrainer(event) {
    event.preventDefault();

    const trainerId = document.getElementById('updateTrainerId').value;
    const updates = {};

    const name = document.getElementById('updateTrainerName').value.trim();
    if (name) updates.name = name;

    const location = document.getElementById('updateTrainerLocation').value.trim();
    if (location) updates.location_name = location;

    try {
        const response = await fetch('/update-trainer', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ trainerId, updates })
        });

        const responseData = await response.json();
        const messageElement = document.getElementById('updateTrainerResultMsg');

        messageElement.textContent = responseData.message;
        messageElement.style.color = responseData.success ? 'green' : 'red';

        if (responseData.success) {
            alert("Trainer updated successfully!");
            document.getElementById('updateTrainer').reset();
            refreshAllTables();
        } else {
            alert("Error updating Trainer! Check your input.");
        }
    } catch (error) {
        document.getElementById('updateTrainerResultMsg').textContent = 'Error: ' + error.message;
        document.getElementById('updateTrainerResultMsg').style.color = 'red';
    }
}

async function updatePlayer(event) {
    event.preventDefault();

    const trainerId = document.getElementById('updatePlayerTrainerId').value;
    const updates = {};

    const money = document.getElementById('updatePlayerMoney').value;
    if (money) {
        updates.money = money;
    }

    try {
        const response = await fetch('/update-player', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ trainerId, updates })
        });

        const responseData = await response.json();
        const messageElement = document.getElementById('updatePlayerResultMsg');

        if (responseData.success) {
            alert("Player updated successfully!");
            messageElement.textContent = "Player updated successfully!";
            document.getElementById('updatePlayer').reset();
            refreshAllTables();
        } else {
            alert("Error updating Player! " + responseData.message);
            messageElement.textContent = "Error updating Player: " + responseData.message;
        }
    } catch (error) {
        const messageElement = document.getElementById('updatePlayerResultMsg');
        messageElement.textContent = 'Error: ' + error.message;
        messageElement.style.color = 'red';
    }
}

async function updatePokemon(event) {
    event.preventDefault();

    const pokedex = document.getElementById('updatePokemonPokedex').value;
    const pokemonId = document.getElementById('updatePokemonId').value;
    const updates = {};

    const fields = [
        { id: 'updatePokemonName', field: 'name', type: 'string' },
        { id: 'updatePokemonXP', field: 'total_XP', type: 'number' },
        { id: 'updatePokemonNature', field: 'nature', type: 'string' },
        { id: 'updatePokemonHPIV', field: 'HP_IV', type: 'number' },
        { id: 'updatePokemonAttackIV', field: 'attack_IV', type: 'number' },
        { id: 'updatePokemonDefenseIV', field: 'defense_IV', type: 'number' },
        { id: 'updatePokemonSpeedIV', field: 'speed_IV', type: 'number' },
        { id: 'updatePokemonAbilityId', field: 'ability_id', type: 'number' },
        { id: 'updatePokemonTrainerId', field: 'trainer_id', type: 'number' }
    ];

    fields.forEach(({ id, field, type }) => {
        const element = document.getElementById(id);
        if (element.value) {
            updates[field] = type === 'number' ? parseInt(element.value) : element.value;
        }
    });

    const messageElement = document.getElementById('updatePokemonResultMsg');
    try {
        const response = await fetch('/update-pokemon', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ pokedex, pokemonId, updates })
        });

        const responseData = await response.json();

        messageElement.textContent = responseData.message;
        messageElement.style.color = responseData.success ? 'green' : 'red';

        if (responseData.success) {
            alert("Pokemon updated successfully!");
            document.getElementById('updatePokemon').reset();
            refreshAllTables();
        } else {
            alert("Error updating Pokemon! Check your input.");
        }
    } catch (error) {
        messageElement.textContent = 'Error: ' + error.message;
        messageElement.style.color = 'red';
    }
}

async function updateLearnedMove(event) {
    event.preventDefault();

    const pokedex = document.getElementById('updateLearnedMovePokedex').value;
    const pokemonId = document.getElementById('updateLearnedMovePokemonId').value;
    const oldMoveId = document.getElementById('updateLearnedMoveOldId').value;
    const newMoveId = document.getElementById('updateLearnedMoveNewId').value;

    try {
        const response = await fetch('/update-learned-move', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                pokedex: parseInt(pokedex),
                pokemonId: parseInt(pokemonId),
                oldMoveId: parseInt(oldMoveId),
                newMoveId: parseInt(newMoveId)
            })
        });

        const responseData = await response.json();
        const messageElement = document.getElementById('updateLearnedMoveResultMsg');

        if (responseData.success) {
            alert("Move updated successfully!");
            messageElement.textContent = "Move updated successfully!";
            document.getElementById('updateLearnedMove').reset();
            refreshAllTables();
        } else {
            alert("Error updating move: " + responseData.message);
            messageElement.textContent = "Error: " + responseData.message;
            messageElement.style.color = 'red';
        }
    } catch (error) {
        const messageElement = document.getElementById('updateLearnedMoveResultMsg');
        messageElement.textContent = 'A client-side error occurred: ' + error.message;
        messageElement.style.color = 'red';
    }
}

// ==================== SELECTION QUERY FUNCTIONS ====================

function createConditionRow() {
    const conditionDiv = document.createElement('div');
    conditionDiv.className = 'condition-row';
    conditionDiv.style.marginBottom = '10px';

    const attributes = ['pokedex', 'pokemon_id', 'name', 'total_XP', 'nature', 'HP_IV', 'attack_IV', 'defense_IV', 'speed_IV', 'ability_id', 'trainer_id'];
    const attrSelect = document.createElement('select');
    attrSelect.className = 'attribute-select';
    attributes.forEach(attr => {
        const option = document.createElement('option');
        option.value = attr;
        option.textContent = attr;
        attrSelect.appendChild(option);
    });

    const operators = ['=', '!=', '>', '<', '>=', '<='];
    const opSelect = document.createElement('select');
    opSelect.className = 'operator-select';
    operators.forEach(op => {
        const option = document.createElement('option');
        option.value = op;
        option.textContent = op;
        opSelect.appendChild(option);
    });

    const valueInput = document.createElement('input');
    valueInput.type = 'text';
    valueInput.className = 'value-input';
    valueInput.placeholder = 'Enter value';

    const logicalSelect = document.createElement('select');
    logicalSelect.className = 'logical-select';
    logicalSelect.innerHTML = '<option value="AND">AND</option><option value="OR">OR</option>';
    logicalSelect.style.display = 'none';

    const removeBtn = document.createElement('button');
    removeBtn.type = 'button';
    removeBtn.textContent = 'Remove';
    removeBtn.onclick = () => {
        conditionDiv.remove();
        updateLogicalSelects();
    };

    conditionDiv.appendChild(attrSelect);
    conditionDiv.appendChild(document.createTextNode(' '));
    conditionDiv.appendChild(opSelect);
    conditionDiv.appendChild(document.createTextNode(' '));
    conditionDiv.appendChild(valueInput);
    conditionDiv.appendChild(document.createTextNode(' '));
    conditionDiv.appendChild(logicalSelect);
    conditionDiv.appendChild(document.createTextNode(' '));
    conditionDiv.appendChild(removeBtn);

    document.getElementById('conditionsContainer').appendChild(conditionDiv);
    updateLogicalSelects();
}

function updateLogicalSelects() {
    const conditions = document.querySelectorAll('.condition-row');
    conditions.forEach((condition, index) => {
        const logicalSelect = condition.querySelector('.logical-select');
        if (index < conditions.length - 1) {
            logicalSelect.style.display = 'inline';
        } else {
            logicalSelect.style.display = 'none';
        }
    });
}

async function handleSelectionQuery(event) {
    event.preventDefault();

    const conditions = [];
    const conditionRows = document.querySelectorAll('.condition-row');

    if (conditionRows.length === 0) {
        document.getElementById('selectionResultMsg').textContent = 'Please add at least one condition.';
        document.getElementById('selectionResultMsg').style.color = 'red';
        return;
    }

    conditionRows.forEach(row => {
        const attribute = row.querySelector('.attribute-select').value;
        const operator = row.querySelector('.operator-select').value;
        const value = row.querySelector('.value-input').value;
        const logical = row.querySelector('.logical-select').value;

        if (value.trim() === '') {
            return;
        }
        conditions.push({ attribute, operator, value, logical });
    });

    try {
        const response = await fetch('/selection-query', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ conditions })
        });

        const result = await response.json();
        const resultElement = document.getElementById('selectionResultMsg');

        if (result.success) {
            resultElement.textContent = `Found ${result.data.length} Pokemon.`;
            resultElement.style.color = 'green';
            displaySelectionResults(result.data);
        } else {
            resultElement.textContent = result.message || 'Error executing selection query!';
            resultElement.style.color = 'red';
        }
    } catch (error) {
        const resultElement = document.getElementById('selectionResultMsg');
        resultElement.textContent = 'Client-side error: ' + error.message;
        resultElement.style.color = 'red';
    }
}

function displaySelectionResults(data) {
    const tableElement = document.getElementById('selectionResultTable');
    const tableHead = tableElement.querySelector('thead');
    const tableBody = tableElement.querySelector('tbody');

    tableHead.innerHTML = '';
    tableBody.innerHTML = '';

    if (data.length === 0) return;

    const headers = ['Pokedex #', 'Pokemon ID', 'Name', 'Level', 'Nature', 'HP IV', 'Attack IV', 'Defense IV', 'Speed IV', 'Ability ID', 'Trainer ID'];
    const headerRow = tableHead.insertRow();
    headers.forEach(headerText => {
        const th = document.createElement('th');
        th.textContent = headerText;
        headerRow.appendChild(th);
    });

    data.forEach(rowData => {
        const tr = tableBody.insertRow();
        rowData.forEach(field => {
            const td = tr.insertCell();
            td.textContent = field !== null ? field : 'NULL';
        });
    });
}

function addCondition() {
    const container = document.getElementById('selectionConditions');
    const newCondition = container.firstElementChild.cloneNode(true);
    newCondition.querySelector('input[name="value"]').value = '';
    container.appendChild(newCondition);
}

async function handlePokemonSelection(event) {
    event.preventDefault();
    const conditions = Array.from(document.querySelectorAll('#selectionConditions .condition')).map(div => {
        return {
            attribute: div.querySelector('[name="attribute"]').value,
            operator: div.querySelector('[name="operator"]').value,
            value: div.querySelector('[name="value"]').value,
            logical: div.querySelector('[name="logical"]').value
        };
    });

    const response = await fetch('/pokemon/selection', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ conditions })
    });

    const responseData = await response.json();
    const tableBody = document.getElementById('pokemonSelectionTable').querySelector('tbody');
    const messageElement = document.getElementById('pokemonSelectionResultMsg');
    tableBody.innerHTML = '';

    if (responseData.success && responseData.data.length > 0) {
        messageElement.textContent = `Found ${responseData.data.length} Pokémon.`;
        messageElement.style.color = 'green';
        responseData.data.forEach(pokemon => {
            const row = tableBody.insertRow();
            pokemon.forEach((field, index) => {
                const cell = row.insertCell(index);
                cell.textContent = field || 'NULL';
            });
        });
    } else if (responseData.success) {
        messageElement.textContent = 'No Pokémon found with the specified criteria.';
        messageElement.style.color = 'orange';
    } else {
        messageElement.textContent = 'Error performing search: ' + responseData.message;
        messageElement.style.color = 'red';
    }
}

// ==================== PROJECTION QUERY FUNCTIONS ===================

async function populateTableDropdown() {
    try {
        const response = await fetch('/tables', { method: 'GET' });
        const responseData = await response.json();
        const tables = responseData.data;

        const tableSelect = document.getElementById('tableSelect');
        tableSelect.innerHTML = '<option value="" disabled selected>Select a table</option>';

        tables.forEach(table => {
            const option = document.createElement('option');
            option.value = table;
            option.textContent = table;
            tableSelect.appendChild(option);
        });
    } catch (error) {
        console.error('Error fetching tables:', error);
        document.getElementById('projectionResultMsg').textContent = 'Error fetching tables: ' + error.message;
        document.getElementById('projectionResultMsg').style.color = 'red';
    }
}

async function populateAttributeCheckboxes() {
    const tableSelect = document.getElementById('tableSelect');
    const tableName = tableSelect.value;
    const attributeCheckboxes = document.getElementById('attributeCheckboxes');
    attributeCheckboxes.innerHTML = '';

    if (!tableName) return;

    try {
        const response = await fetch(`/columns/${tableName}`, { method: 'GET' });
        const responseData = await response.json();
        const columns = responseData.data;

        if (columns.length === 0) {
            attributeCheckboxes.innerHTML = '<p>No attributes available for this table.</p>';
            return;
        }

        attributeCheckboxes.style.display = 'flex';
        attributeCheckboxes.style.flexDirection = 'column';
        attributeCheckboxes.style.gap = '10px';

        columns.forEach(column => {
            const label = document.createElement('label');
            label.style.display = 'inline-flex';
            label.style.alignItems = 'center';
            label.style.gap = '8px';
            label.style.width = 'auto';
            const checkbox = document.createElement('input');
            checkbox.type = 'checkbox';
            checkbox.value = column;
            checkbox.name = 'attributes';
            label.appendChild(checkbox);
            label.appendChild(document.createTextNode(column));
            attributeCheckboxes.appendChild(label);
        });
    } catch (error) {
        console.error('Error fetching columns:', error);
        document.getElementById('projectionResultMsg').textContent = 'Error fetching attributes: ' + error.message;
        document.getElementById('projectionResultMsg').style.color = 'red';
    }
}

async function runProjectionQuery(event) {
    event.preventDefault();

    const tableName = document.getElementById('tableSelect').value;
    const checkboxes = document.getElementsByName('attributes');
    const selectedAttributes = Array.from(checkboxes)
        .filter(checkbox => checkbox.checked)
        .map(checkbox => checkbox.value);

    if (!tableName || selectedAttributes.length === 0) {
        document.getElementById('projectionResultMsg').textContent = 'Please select a table and at least one attribute.';
        document.getElementById('projectionResultMsg').style.color = 'red';
        return;
    }

    try {
        const response = await fetch('/project', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ table: tableName, attributes: selectedAttributes })
        });

        const result = await response.json();
        const messageElement = document.getElementById('projectionResultMsg');

        if (result.success) {
            messageElement.textContent = 'Projection query executed successfully!';
            messageElement.style.color = 'green';
            displayProjectionResults(result.data, selectedAttributes);
        } else {
            messageElement.textContent = result.message || 'Error executing projection query!';
            messageElement.style.color = 'red';
        }
    } catch (error) {
        const messageElement = document.getElementById('projectionResultMsg');
        messageElement.textContent = 'Error: ' + error.message;
        messageElement.style.color = 'red';
    }
}

function displayProjectionResults(data, attributes) {
    const tableElement = document.getElementById('projectionResultTable');
    const tableHead = tableElement.querySelector('thead');
    const tableBody = tableElement.querySelector('tbody');

    tableHead.innerHTML = '';
    tableBody.innerHTML = '';

    const headerRow = tableHead.insertRow();
    attributes.forEach(attr => {
        const th = document.createElement('th');
        th.textContent = attr;
        headerRow.appendChild(th);
    });

    data.forEach(row => {
        const tr = tableBody.insertRow();
        row.forEach((field, index) => {
            const td = tr.insertCell(index);
            td.textContent = field || 'NULL';
        });
    });
}

// ==================== JOIN QUERY FUNCTIONS ==================

async function populateLocationDropdown() {
    try {
        const response = await fetch('/locations', { method: 'GET' });
        const responseData = await response.json();
        const locations = responseData.data;

        const locationSelect = document.getElementById('locationFilter');
        locationSelect.innerHTML = '<option value="">All Locations</option>';

        locations.forEach(location => {
            const option = document.createElement('option');
            option.value = location;
            option.textContent = location;
            locationSelect.appendChild(option);
        });
    } catch (error) {
        console.error('Error fetching locations:', error);
    }
}

async function handleJoinQuery(event) {
    event.preventDefault();

    const location = document.getElementById('locationFilter').value;
    const url = location ? `/join/species-location?location=${encodeURIComponent(location)}` : '/join/species-location';

    try {
        const response = await fetch(url, { method: 'GET' });
        const result = await response.json();
        const messageElement = document.getElementById('joinResultMsg');

        if (result.success) {
            messageElement.textContent = `Found ${result.data.length} species-location combinations.`;
            messageElement.style.color = 'green';
            displayJoinResults(result.data);
        } else {
            messageElement.textContent = result.message || 'Error executing join query!';
            messageElement.style.color = 'red';
        }
    } catch (error) {
        const messageElement = document.getElementById('joinResultMsg');
        messageElement.textContent = 'Error: ' + error.message;
        messageElement.style.color = 'red';
    }
}

function displayJoinResults(data) {
    const tableElement = document.getElementById('joinResultTable');
    const tableBody = tableElement.querySelector('tbody');

    tableBody.innerHTML = '';

    data.forEach(row => {
        const tr = tableBody.insertRow();
        row.forEach(field => {
            const td = tr.insertCell();
            td.textContent = field !== null ? field : 'NULL';
        });
    });
}

// =================== AGGREGATION QUERY FUNCTIONS ==================

async function handleDefenseIVQuery(event) {
    event.preventDefault();

    const minDefenseIV = document.getElementById('minDefenseIV').value;
    const url = minDefenseIV ? `/aggregation/defense-iv?minDefenseIV=${minDefenseIV}` : '/aggregation/defense-iv';

    try {
        const response = await fetch(url, { method: 'GET' });
        const result = await response.json();
        const messageElement = document.getElementById('defenseIVResultMsg');

        if (result.success) {
            messageElement.textContent = `Found ${result.data.length} Pokemon records.`;
            messageElement.style.color = 'green';
            displayDefenseIVResults(result.data);
        } else {
            messageElement.textContent = result.message || 'Error executing defense IV query!';
            messageElement.style.color = 'red';
        }
    } catch (error) {
        const messageElement = document.getElementById('defenseIVResultMsg');
        messageElement.textContent = 'Error: ' + error.message;
        messageElement.style.color = 'red';
    }
}

function displayDefenseIVResults(data) {
    const tableElement = document.getElementById('defenseIVTable');
    const tableBody = tableElement.querySelector('tbody');

    tableBody.innerHTML = '';

    data.forEach(row => {
        const tr = tableBody.insertRow();
        row.forEach(field => {
            const td = tr.insertCell();
            td.textContent = field !== null ? field : 'NULL';
        });
    });
}

async function handleTrainerStats() {
    try {
        const response = await fetch('/aggregation/trainer-pokemon-count', { method: 'GET' });
        const result = await response.json();
        const messageElement = document.getElementById('trainerStatsResultMsg');

        if (result.success) {
            messageElement.textContent = `Showing statistics for ${result.data.length} trainers.`;
            messageElement.style.color = 'green';
            displayTrainerStatsResults(result.data);
        } else {
            messageElement.textContent = result.message || 'Error executing trainer stats query!';
            messageElement.style.color = 'red';
        }
    } catch (error) {
        const messageElement = document.getElementById('trainerStatsResultMsg');
        messageElement.textContent = 'Error: ' + error.message;
        messageElement.style.color = 'red';
    }
}

function displayTrainerStatsResults(data) {
    const tableElement = document.getElementById('trainerStatsTable');
    const tableBody = tableElement.querySelector('tbody');

    tableBody.innerHTML = '';

    data.forEach(row => {
        const tr = tableBody.insertRow();
        row.forEach(field => {
            const td = tr.insertCell();
            td.textContent = field !== null ? field : 'NULL';
        });
    });
}

// =================== AGGREGATION WITH HAVING FUNCTIONS ===================

async function handleHighestXPQuery(event) {
    event.preventDefault();

    const minPokemonCount = document.getElementById('minPokemonCount').value;
    const url = `/aggregation/highest-xp-having?minPokemonCount=${minPokemonCount}`;

    try {
        const response = await fetch(url, { method: 'GET' });
        const result = await response.json();
        const messageElement = document.getElementById('highestXPResultMsg');

        if (result.success) {
            messageElement.textContent = `Found ${result.data.length} trainers with at least ${minPokemonCount} Pokemon.`;
            messageElement.style.color = 'green';
            displayHighestXPResults(result.data);
        } else {
            messageElement.textContent = result.message || 'Error executing highest XP query!';
            messageElement.style.color = 'red';
        }
    } catch (error) {
        const messageElement = document.getElementById('highestXPResultMsg');
        messageElement.textContent = 'Error: ' + error.message;
        messageElement.style.color = 'red';
    }
}

function displayHighestXPResults(data) {
    const tableElement = document.getElementById('highestXPTable');
    const tableBody = tableElement.querySelector('tbody');

    tableBody.innerHTML = '';

    data.forEach(row => {
        const tr = tableBody.insertRow();
        row.forEach(field => {
            const td = tr.insertCell();
            td.textContent = field !== null ? field : 'NULL';
        });
    });
}

async function handleMultiplePokemonQuery(event) {
    event.preventDefault();

    const minXP = document.getElementById('minXPFilter').value;
    const url = minXP ? `/aggregation/trainers-multiple-pokemon?minXP=${minXP}` : '/aggregation/trainers-multiple-pokemon';

    try {
        const response = await fetch(url, { method: 'GET' });
        const result = await response.json();
        const messageElement = document.getElementById('multiplePokemonResultMsg');

        if (result.success) {
            messageElement.textContent = `Found ${result.data.length} trainers with multiple Pokemon.`;
            messageElement.style.color = 'green';
            displayMultiplePokemonResults(result.data);
        } else {
            messageElement.textContent = result.message || 'Error executing multiple Pokemon query!';
            messageElement.style.color = 'red';
        }
    } catch (error) {
        const messageElement = document.getElementById('multiplePokemonResultMsg');
        messageElement.textContent = 'Error: ' + error.message;
        messageElement.style.color = 'red';
    }
}

function displayMultiplePokemonResults(data) {
    const tableElement = document.getElementById('multiplePokemonTable');
    const tableBody = tableElement.querySelector('tbody');

    tableBody.innerHTML = '';

    data.forEach(row => {
        const tr = tableBody.insertRow();
        row.forEach(field => {
            const td = tr.insertCell();
            td.textContent = field !== null ? field : 'NULL';
        });
    });
}

// ================== NESTED AGGREGATION FUNCTIONS ====================

async function handleNestedAggregation() {
    try {
        const response = await fetch('/aggregation/nested', { method: 'GET' });
        const result = await response.json();
        const messageElement = document.getElementById('nestedAggregationResultMsg');

        if (result.success) {
            messageElement.textContent = `Found ${result.data.length} trainers with above-average Pokemon XP.`;
            messageElement.style.color = 'green';
            displayNestedAggregationResults(result.data);
        } else {
            messageElement.textContent = result.message || 'Error executing nested aggregation query!';
            messageElement.style.color = 'red';
        }
    } catch (error) {
        const messageElement = document.getElementById('nestedAggregationResultMsg');
        messageElement.textContent = 'Error: ' + error.message;
        messageElement.style.color = 'red';
    }
}

function displayNestedAggregationResults(data) {
    const tableElement = document.getElementById('nestedAggregationTable');
    const tableBody = tableElement.querySelector('tbody');

    tableBody.innerHTML = '';

    data.forEach(row => {
        const tr = tableBody.insertRow();
        row.forEach(field => {
            const td = tr.insertCell();
            td.textContent = field !== null ? field : 'NULL';
        });
    });
}

async function handleAboveAverageQuery() {
    try {
        const response = await fetch('/aggregation/trainers-above-average', { method: 'GET' });
        const result = await response.json();
        const messageElement = document.getElementById('aboveAverageResultMsg');

        if (result.success) {
            messageElement.textContent = `Found ${result.data.length} trainers above global average.`;
            messageElement.style.color = 'green';
            displayAboveAverageResults(result.data);
        } else {
            messageElement.textContent = result.message || 'Error executing above average query!';
            messageElement.style.color = 'red';
        }
    } catch (error) {
        const messageElement = document.getElementById('aboveAverageResultMsg');
        messageElement.textContent = 'Error: ' + error.message;
        messageElement.style.color = 'red';
    }
}

function displayAboveAverageResults(data) {
    const tableElement = document.getElementById('aboveAverageTable');
    const tableBody = tableElement.querySelector('tbody');

    tableBody.innerHTML = '';

    data.forEach(row => {
        const tr = tableBody.insertRow();
        row.forEach(field => {
            const td = tr.insertCell();
            td.textContent = field !== null ? field : 'NULL';
        });
    });
}

// ==================== DIVISION QUERY FUNCTIONS ====================

async function populateTypeCheckboxes() {
    try {
        const response = await fetch('/types', { method: 'GET' });
        const responseData = await response.json();
        const types = responseData.data;

        const typeContainer = document.getElementById('typeCheckboxes');
        typeContainer.innerHTML = '';

        typeContainer.style.display = 'flex';
        typeContainer.style.flexDirection = 'column';
        typeContainer.style.gap = '10px';

        types.forEach(type => {
            const label = document.createElement('label');
            label.style.display = 'inline-flex';
            label.style.alignItems = 'center';
            label.style.gap = '8px';
            label.style.width = 'auto';

            const checkbox = document.createElement('input');
            checkbox.type = 'checkbox';
            checkbox.value = type;
            checkbox.name = 'types';

            label.appendChild(checkbox);
            label.appendChild(document.createTextNode(type));
            typeContainer.appendChild(label);
        });
    } catch (error) {
        console.error('Error fetching types:', error);
    }
}

async function handleDivisionQuery(event) {
    event.preventDefault();

    const checkboxes = document.getElementsByName('types');
    const selectedTypes = Array.from(checkboxes)
        .filter(checkbox => checkbox.checked)
        .map(checkbox => checkbox.value);

    try {
        const response = await fetch('/division/species-with-types', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ types: selectedTypes })
        });

        const result = await response.json();
        const messageElement = document.getElementById('divisionResultMsg');

        if (result.success) {
            if (selectedTypes.length === 0) {
                messageElement.textContent = `Showing all ${result.data.length} species and their types.`;
            } else {
                messageElement.textContent = `Found ${result.data.length} species with types: ${selectedTypes.join(', ')}.`;
            }
            messageElement.style.color = 'green';
            displayDivisionResults(result.data);
        } else {
            messageElement.textContent = result.message || 'Error executing division query!';
            messageElement.style.color = 'red';
        }
    } catch (error) {
        const messageElement = document.getElementById('divisionResultMsg');
        messageElement.textContent = 'Error: ' + error.message;
        messageElement.style.color = 'red';
    }
}

async function showAllSpeciesTypes() {
    try {
        const response = await fetch('/division/species-with-types', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ types: [] })
        });

        const result = await response.json();
        const messageElement = document.getElementById('divisionResultMsg');

        if (result.success) {
            messageElement.textContent = `Showing all ${result.data.length} species and their types.`;
            messageElement.style.color = 'green';
            displayDivisionResults(result.data);
        } else {
            messageElement.textContent = result.message || 'Error showing all species types!';
            messageElement.style.color = 'red';
        }
    } catch (error) {
        const messageElement = document.getElementById('divisionResultMsg');
        messageElement.textContent = 'Error: ' + error.message;
        messageElement.style.color = 'red';
    }
}

function displayDivisionResults(data) {
    const tableElement = document.getElementById('divisionResultTable');
    const tableBody = tableElement.querySelector('tbody');

    tableBody.innerHTML = '';

    data.forEach(row => {
        const tr = tableBody.insertRow();
        row.forEach(field => {
            const td = tr.insertCell();
            td.textContent = field !== null ? field : 'NULL';
        });
    });
}

async function handleTypeCountQuery(event) {
    event.preventDefault();

    const exactTypeCount = document.getElementById('exactTypeCount').value;
    const url = exactTypeCount ? `/division/species-by-type-count?exactTypeCount=${exactTypeCount}` : '/division/species-by-type-count';

    try {
        const response = await fetch(url, { method: 'GET' });
        const result = await response.json();
        const messageElement = document.getElementById('typeCountResultMsg');

        if (result.success) {
            if (exactTypeCount) {
                messageElement.textContent = `Found ${result.data.length} species with exactly ${exactTypeCount} type(s).`;
            } else {
                messageElement.textContent = `Showing ${result.data.length} species grouped by type count.`;
            }
            messageElement.style.color = 'green';
            displayTypeCountResults(result.data);
        } else {
            messageElement.textContent = result.message || 'Error executing type count query!';
            messageElement.style.color = 'red';
        }
    } catch (error) {
        const messageElement = document.getElementById('typeCountResultMsg');
        messageElement.textContent = 'Error: ' + error.message;
        messageElement.style.color = 'red';
    }
}

function displayTypeCountResults(data) {
    const tableElement = document.getElementById('typeCountTable');
    const tableBody = tableElement.querySelector('tbody');

    tableBody.innerHTML = '';

    data.forEach(row => {
        const tr = tableBody.insertRow();
        row.forEach(field => {
            const td = tr.insertCell();
            td.textContent = field !== null ? field : 'NULL';
        });
    });
}

// ==================== EVENT LISTENERS AND INITIALIZATION ====================

window.onload = function () {
    checkDbConnection();
    refreshAllTables();
    populateTableDropdown();
    populateLocationDropdown();
    populateTypeCheckboxes();

    // System events
    document.getElementById("resetDemotable").addEventListener("click", resetDemotable);

    // Insert events
    document.getElementById("insertTrainer").addEventListener("submit", insertTrainer);
    document.getElementById("insertPlayer").addEventListener("submit", insertPlayer);
    document.getElementById("insertPokemon").addEventListener("submit", insertPokemon);
    document.getElementById("insertLearnedMove").addEventListener("submit", insertLearnedMove);

    // Delete events
    document.getElementById("deleteTrainer").addEventListener("submit", deleteTrainer);
    document.getElementById("deletePokemon").addEventListener("submit", deletePokemon);
    document.getElementById("deleteLearnedMove").addEventListener("submit", deleteLearnedMove);

    // Update events
    document.getElementById('updateTrainer').addEventListener('submit', updateTrainer);
    document.getElementById('updatePlayer').addEventListener('submit', updatePlayer);
    document.getElementById('updatePokemon').addEventListener('submit', updatePokemon);
    document.getElementById('updateLearnedMove').addEventListener('submit', updateLearnedMove);

    // Selection events
    document.getElementById('addCondition').addEventListener('click', addCondition);
    document.getElementById('pokemonSelectionForm').addEventListener('submit', handlePokemonSelection);
    document.getElementById('addConditionBtn').addEventListener('click', createConditionRow);
    document.getElementById('selectionQueryForm').addEventListener('submit', handleSelectionQuery);

    // Projection events
    document.getElementById('tableSelect').addEventListener('change', populateAttributeCheckboxes);
    document.getElementById('projectionQuery').addEventListener('submit', runProjectionQuery);

    // Join events
    document.getElementById('joinQueryForm').addEventListener('submit', handleJoinQuery);

    // Aggregation events
    document.getElementById('defenseIVForm').addEventListener('submit', handleDefenseIVQuery);
    document.getElementById('trainerStatsBtn').addEventListener('click', handleTrainerStats);

    // Aggregation with HAVING events
    document.getElementById('highestXPForm').addEventListener('submit', handleHighestXPQuery);
    document.getElementById('multiplePokemonForm').addEventListener('submit', handleMultiplePokemonQuery);

    // Nested aggregation events
    document.getElementById('nestedAggregationBtn').addEventListener('click', handleNestedAggregation);
    document.getElementById('aboveAverageBtn').addEventListener('click', handleAboveAverageQuery);

    // Division events
    document.getElementById('divisionQueryForm').addEventListener('submit', handleDivisionQuery);
    document.getElementById('showAllSpeciesTypesBtn').addEventListener('click', showAllSpeciesTypes);
    document.getElementById('typeCountForm').addEventListener('submit', handleTypeCountQuery);
};