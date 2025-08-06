const express = require('express');
const appService = require('./appService');

const router = express.Router();

// ==================== SYSTEM ENDPOINTS ====================

router.get('/check-db-connection', async (req, res) => {
    const isConnect = await appService.testOracleConnection();
    if (isConnect) {
        res.send('connected');
    } else {
        res.send('unable to connect');
    }
});

router.post("/initiate-demotable", async (req, res) => {
    const initiateResult = await appService.initiatePokemonDB();
    if (initiateResult) {
        res.json({ success: true });
    } else {
        res.status(500).json({ success: false });
    }
});

router.get('/count-demotable', async (req, res) => {
    const tableCount = await appService.countDemotable();
    if (tableCount >= 0) {
        res.json({ 
            success: true,  
            count: tableCount
        });
    } else {
        res.status(500).json({ 
            success: false, 
            count: tableCount
        });
    }
});

// ==================== BASIC FETCH ENDPOINTS ====================

router.get('/demotable', async (req, res) => {
    const tableContent = await appService.fetchDemotableFromDb();
    res.json({data: tableContent});
});

router.get('/trainers', async (req, res) => {
    const tableContent = await appService.fetchTrainersFromDb();
    res.json({data: tableContent});
});

router.get('/players', async (req, res) => {
    const tableContent = await appService.fetchPlayersFromDb();
    res.json({data: tableContent});
});

router.get('/pokemon', async (req, res) => {
    const tableContent = await appService.fetchPokemonFromDb();
    res.json({data: tableContent});
});

router.get('/learned-moves', async (req, res) => {
    const tableContent = await appService.fetchLearnedMovesFromDb();
    res.json({data: tableContent});
});

router.get('/species', async (req, res) => {
    const tableContent = await appService.fetchSpeciesFromDb();
    res.json({data: tableContent});
});

router.get('/moves', async (req, res) => {
    const tableContent = await appService.fetchMovesFromDb();
    res.json({data: tableContent});
});

router.get('/abilities', async (req, res) => {
    const tableContent = await appService.fetchAbilitiesFromDb();
    res.json({data: tableContent});
});

router.get('/natures', async (req, res) => {
    const tableContent = await appService.fetchNaturesFromDb();
    res.json({data: tableContent});
});

// ==================== INSERT OPERATIONS ====================

router.post("/insert-demotable", async (req, res) => {
    const { id, name } = req.body;
    const insertResult = await appService.insertDemotable(id, name);
    if (insertResult) {
        res.json({ success: true });
    } else {
        res.status(500).json({ success: false });
    }
});

router.post("/insert-trainer", async (req, res) => {
    const { trainerId, name, locationName } = req.body;
    const insertResult = await appService.insertTrainer(trainerId, name, locationName);
    if (insertResult) {
        res.json({ success: true });
    } else {
        res.status(500).json({ success: false });
    }
});

router.post("/insert-player", async (req, res) => {
    const { trainerId, money } = req.body;
    const insertResult = await appService.insertPlayer(trainerId, money);
    if (insertResult) {
        res.json({ success: true });
    } else {
        res.status(500).json({ success: false });
    }
});

router.post("/insert-pokemon", async (req, res) => {
    const { pokedex, pokemon_id, name, total_XP, nature, HP_IV, attack_IV, defense_IV, speed_IV, ability_id, trainer_id } = req.body;
    const insertResult = await appService.insertPokemon(pokedex, pokemon_id, name, total_XP, nature, HP_IV, attack_IV, defense_IV, speed_IV, ability_id, trainer_id);
    if (insertResult) {
        res.json({ success: true });
    } else {
        res.status(500).json({ success: false });
    }
});

router.post("/insert-learned-move", async (req, res) => {
    const { pokedex, pokemon_id, move_id } = req.body;
    const insertResult = await appService.insertPokemonHasLearnedMove(pokedex, pokemon_id, move_id);
    if (insertResult) {
        res.json({ success: true });
    } else {
        res.status(500).json({ success: false });
    }
});

// ==================== DELETE OPERATIONS ====================

router.delete('/delete-trainer', async (req, res) => {
    const { trainerId } = req.body;
    const success = await appService.deleteTrainer(trainerId);
    if (success) {
        res.json({ success: true });
    } else {
        res.status(500).json({ success: false });
    }
});

router.delete('/delete-pokemon', async (req, res) => {
    const { pokedex, pokemon_id } = req.body;
    const success = await appService.deletePokemon(pokedex, pokemon_id);
    if (success) {
        res.json({ success: true });
    } else {
        res.status(500).json({ success: false });
    }
});

router.delete('/delete-learned-move', async (req, res) => {
    const { pokedex, pokemon_id, move_id } = req.body;
    const success = await appService.deletePokemonHasLearnedMove(pokedex, pokemon_id, move_id);
    if (success) {
        res.json({ success: true });
    } else {
        res.status(500).json({ success: false });
    }
});

// ==================== UPDATE OPERATIONS ====================

router.post("/update-name-demotable", async (req, res) => {
    const { oldName, newName } = req.body;
    const updateResult = await appService.updateNameDemotable(oldName, newName);
    if (updateResult) {
        res.json({ success: true });
    } else {
        res.status(500).json({ success: false });
    }
});

router.post('/update-trainer', async (req, res) => {
    try {
        const { trainerId, updates } = req.body;
        const success = await appService.updateTrainer(trainerId, updates);
        res.json({ success, message: "Trainer updated successfully" });
    } catch (err) {
        res.status(400).json({ success: false, message: err.message });
    }
});

router.post('/update-player', async (req, res) => {
    try {
        const { trainerId, updates } = req.body;
        const success = await appService.updatePlayer(trainerId, updates);
        res.json({ success, message: "Player updated successfully" });
    } catch (err) {
        res.status(400).json({ success: false, message: err.message });
    }
});

router.post('/update-pokemon', async (req, res) => {
    try {
        const { pokedex, pokemonId, updates } = req.body;
        const success = await appService.updatePokemon(pokedex, pokemonId, updates);
        res.json({ success, message: "Pokemon updated successfully" });
    } catch (err) {
        res.status(400).json({ success: false, message: err.message });
    }
});

router.post('/update-learned-move', async (req, res) => {
    try {
        const { pokedex, pokemonId, oldMoveId, newMoveId } = req.body;
        const success = await appService.updatePokemonHasLearnedMove(pokedex, pokemonId, oldMoveId, newMoveId);
        res.json({ success, message: "Move updated successfully" });
    } catch (err) {
        res.status(400).json({ success: false, message: err.message });
    }
});

// ==================== SELECTION QUERY ====================

router.post('/pokemon/selection', async (req, res) => {
    try {
        const { conditions } = req.body;
        const result = await appService.fetchPokemonWithSelection(conditions);
        res.json({ success: true, data: result });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
});

router.post('/selection-query', async (req, res) => {
    try {
        const { conditions } = req.body;
        const data = await appService.executeSelectionQuery(conditions);
        res.json({ success: true, data });
    } catch (err) {
        if (err.message.includes("Invalid")) {
            res.status(400).json({ success: false, message: err.message });
        } else {
            res.status(500).json({ success: false, message: 'An error occurred while executing the query.' });
        }
    }
});

// ==================== PROJECTION QUERY ====================

router.get('/tables', async (req, res) => {
    try {
        const tables = await appService.fetchTableNames();
        res.json({ success: true, data: tables });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
});

router.get('/columns/:tableName', async (req, res) => {
    try {
        const tableName = req.params.tableName;
        const columns = await appService.fetchColumnNames(tableName);
        res.json({ success: true, data: columns });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
});

router.post('/project', async (req, res) => {
    try {
        const { table, attributes } = req.body;
        const data = await appService.executeProjectionQuery(table, attributes);
        res.json({ success: true, data });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
});

// ==================== JOIN QUERIES ====================

router.get('/join/species-location', async (req, res) => {
    try {
        const { location } = req.query;
        const data = await appService.executeSpeciesLocationJoin(location);
        res.json({ success: true, data });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
});

router.get('/locations', async (req, res) => {
    try {
        const locations = await appService.fetchLocationsForJoin();
        res.json({ success: true, data: locations });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
});

// ==================== AGGREGATION QUERIES ====================

router.get('/aggregation/defense-iv', async (req, res) => {
    try {
        const { minDefenseIV } = req.query;
        const data = await appService.executeDefenseIVGroupBy(minDefenseIV ? parseInt(minDefenseIV) : null);
        res.json({ success: true, data });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
});

router.get('/aggregation/trainer-pokemon-count', async (req, res) => {
    try {
        const data = await appService.executeTrainerPokemonCount();
        res.json({ success: true, data });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
});

// ==================== AGGREGATION WITH HAVING ====================

router.get('/aggregation/highest-xp-having', async (req, res) => {
    try {
        const { minPokemonCount } = req.query;
        const data = await appService.executeHighestXPHaving(minPokemonCount ? parseInt(minPokemonCount) : 2);
        res.json({ success: true, data });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
});

router.get('/aggregation/trainers-multiple-pokemon', async (req, res) => {
    try {
        const { minXP } = req.query;
        const data = await appService.executeTrainersWithMultiplePokemon(minXP ? parseInt(minXP) : null);
        res.json({ success: true, data });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
});

// ==================== NESTED AGGREGATION ====================

router.get('/aggregation/nested', async (req, res) => {
    try {
        const data = await appService.executeNestedAggregation();
        res.json({ success: true, data });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
});

router.get('/aggregation/trainers-above-average', async (req, res) => {
    try {
        const data = await appService.executeTrainersAboveAverageXP();
        res.json({ success: true, data });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
});

// ==================== DIVISION QUERIES ====================

router.post('/division/species-with-types', async (req, res) => {
    try {
        const { types } = req.body;
        const data = await appService.executeSpeciesWithAllTypes(types);
        res.json({ success: true, data });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
});

router.get('/types', async (req, res) => {
    try {
        const types = await appService.fetchAllTypes();
        res.json({ success: true, data: types });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
});

router.get('/division/species-by-type-count', async (req, res) => {
    try {
        const { exactTypeCount } = req.query;
        const data = await appService.executeSpeciesByTypeCount(exactTypeCount ? parseInt(exactTypeCount) : null);
        res.json({ success: true, data });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
});

module.exports = router;