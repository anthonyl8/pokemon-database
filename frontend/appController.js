const express = require('express');
const appService = require('./appService');

const router = express.Router();

// ----------------------------------------------------------
// API endpoints
// Modify or extend these routes based on your project's needs.
router.get('/check-db-connection', async (req, res) => {
    const isConnect = await appService.testOracleConnection();
    if (isConnect) {
        res.send('connected');
    } else {
        res.send('unable to connect');
    }
});

router.get('/demotable', async (req, res) => {
    const tableContent = await appService.fetchDemotableFromDb();
    res.json({data: tableContent});
});

router.post("/initiate-demotable", async (req, res) => {
    const initiateResult = await appService.initiatePokemonDB();
    if (initiateResult) {
        res.json({ success: true });
    } else {
        res.status(500).json({ success: false });
    }
});

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

router.delete('/delete-trainer', async (req, res) => {
    const trainerId = req.params.id;

    const success = await deleteTrainer(trainerId);
    if (success) {
        res.status(200).json({ message: `Trainer ${trainerId} deleted successfully.` });
    } else {
        res.status(500).json({ error: `Failed to delete trainer ${trainerId}.` });
    }
});

router.delete('/delete-pokemon', async (req, res) => {
    const condition = req.body; // Expecting a JSON with condition fields
    const success = await deletePokemon(condition);
    if (success) {
        res.status(200).json({ message: `Pokemon deleted successfully.` });
    } else {
        res.status(500).json({ error: `Failed to delete pokemon.` });
    }
});

router.post("/update-name-demotable", async (req, res) => {
    const { oldName, newName } = req.body;
    const updateResult = await appService.updateNameDemotable(oldName, newName);
    if (updateResult) {
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


module.exports = router;