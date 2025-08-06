const oracledb = require('oracledb');
const loadEnvFile = require('./utils/envUtil');
const fs = require('fs');
const path = require('path');

const envVariables = loadEnvFile('./.env');

// Database configuration setup. Ensure your .env file has the required database credentials.

const dbConfig = {
    user: envVariables.ORACLE_USER,
    password: envVariables.ORACLE_PASS,
    connectString: `${envVariables.ORACLE_HOST}:${envVariables.ORACLE_PORT}/${envVariables.ORACLE_DBNAME}`,
    poolMin: 1,
    poolMax: 3,
    poolIncrement: 1,
    poolTimeout: 60
};

// INPUT VALIDATION 
function validateInteger(value, fieldName, options = {}) {
    if (value === null || value === undefined || value === '') {
        if (options.required) {
            throw new Error(`${fieldName} is required`);
        }
        return options.allowNull ? null : undefined;
    }

    const num = parseInt(value);
    if (isNaN(num) || num.toString() !== value.toString()) {
        throw new Error(`${fieldName} must be a valid integer`);
    }

    if (options.min !== undefined && num < options.min) {
        throw new Error(`${fieldName} must be at least ${options.min}`);
    }

    if (options.max !== undefined && num > options.max) {
        throw new Error(`${fieldName} must be at most ${options.max}`);
    }

    return num;
}

function validateString(value, fieldName, options = {}) {
    if (!value || value.trim() === '') {
        if (options.required) {
            throw new Error(`${fieldName} is required`);
        }
        return options.allowNull ? null : '';
    }

    if (typeof value !== 'string') {
        throw new Error(`${fieldName} must be a string`);
    }

    value = value.trim();

    // Remove potential XSS
    value = value.replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '');
    value = value.replace(/[<>]/g, '');

    // Check SQL injection patterns
    const sqlPatterns = [
        /(\b(SELECT|INSERT|UPDATE|DELETE|DROP|CREATE|ALTER|EXEC|UNION|SCRIPT)\b)/gi,
        /(-{2}|\/\*|\*\/)/g,
        /(\b(OR|AND)\s+\d+\s*=\s*\d+)/gi,
        /(WAITFOR|DELAY|SLEEP|BENCHMARK|INFORMATION_SCHEMA)/gi,
        /(UNION\s+(ALL\s+)?SELECT)/gi,
        /(\bEXEC\s*\()/gi
    ];

    for (const pattern of sqlPatterns) {
        if (pattern.test(value)) {
            throw new Error(`Invalid characters detected in ${fieldName}`);
        }
    }

    if (options.maxLength && value.length > options.maxLength) {
        throw new Error(`${fieldName} must be ${options.maxLength} characters or less`);
    }

    if (options.pattern && !options.pattern.test(value)) {
        throw new Error(`${fieldName} contains invalid characters`);
    }

    return value;
}

function validateTableName(tableName) {
    const validTables = [
        'TRAINER', 'PLAYER', 'POKEMON_1', 'POKEMON_2', 'POKEMON_3',
        'SPECIES', 'MOVE', 'ABILITY', 'TYPE', 'LOCATION', 'BADGE',
        'EGG_GROUP', 'ITEM_1', 'ITEM_2', 'GYM_LEADER_1', 'GYM_LEADER_2',
        'SPECIES_EVOLVES_INTO', 'POKEMON_HAS_LEARNED_MOVE', 'SPECIES_HAS_TYPE',
        'SPECIES_CAN_LEARN_MOVE', 'SPECIES_CAN_HAVE_ABILITY', 'SPECIES_LOCATED_IN',
        'SPECIES_BELONGS_TO_EGG_GROUP', 'PLAYER_OWNS_BADGE'
    ];

    const upperTableName = tableName.toUpperCase();
    if (!validTables.includes(upperTableName)) {
        throw new Error('Invalid table name');
    }

    return upperTableName;
}

function validateColumnName(tableName, columnName) {
    const validColumns = {
        'TRAINER': ['TRAINER_ID', 'NAME', 'LOCATION_NAME'],
        'PLAYER': ['TRAINER_ID', 'MONEY'],
        'POKEMON_1': ['POKEDEX', 'POKEMON_ID', 'NAME', 'TOTAL_XP', 'NATURE', 'HP_IV', 'ATTACK_IV', 'DEFENSE_IV', 'SPEED_IV', 'ABILITY_ID', 'TRAINER_ID'],
        'POKEMON_2': ['NATURE', 'STAT_INCREASED', 'STAT_DECREASED'],
        'POKEMON_3': ['TOTAL_XP', 'POKEMON_LEVEL'],
        'SPECIES': ['POKEDEX', 'NAME', 'DESCRIPTION'],
        'MOVE': ['MOVE_ID', 'NAME', 'POWER', 'PP', 'ACCURACY', 'DESCRIPTION', 'TYPE_NAME'],
        'ABILITY': ['ABILITY_ID', 'NAME', 'DESCRIPTION'],
        'TYPE': ['NAME', 'COLOUR'],
        'LOCATION': ['NAME', 'CLIMATE', 'TERRAIN_TYPE'],
        'BADGE': ['BADGE_INDEX', 'NAME'],
        'EGG_GROUP': ['EGG_GROUP_ID', 'NAME', 'DESCRIPTION'],
        'ITEM_1': ['NAME', 'DESCRIPTION', 'PRICE', 'LOCATION_NAME'],
        'ITEM_2': ['PRICE', 'RARITY'],
        'GYM_LEADER_1': ['TRAINER_ID', 'DIFFICULTY', 'SPECIALTY_TYPE_NAME', 'BADGE_INDEX'],
        'GYM_LEADER_2': ['DIFFICULTY', 'CASH_REWARD']
    };

    const upperTableName = tableName.toUpperCase();
    const upperColumnName = columnName.toUpperCase();

    if (!validColumns[upperTableName] || !validColumns[upperTableName].includes(upperColumnName)) {
        throw new Error(`Invalid column name ${columnName} for table ${tableName}`);
    }

    return upperColumnName;
}

function validateOperator(operator) {
    const validOperators = ['=', '!=', '>', '<', '>=', '<=', 'LIKE'];
    if (!validOperators.includes(operator)) {
        throw new Error('Invalid operator');
    }
    return operator;
}

function validatePokemonAttribute(attribute) {
    const validAttributes = ['pokedex', 'pokemon_id', 'name', 'total_XP', 'nature', 'HP_IV', 'attack_IV', 'defense_IV', 'speed_IV', 'ability_id', 'trainer_id'];
    if (!validAttributes.includes(attribute)) {
        throw new Error('Invalid Pokemon attribute');
    }
    return attribute;
}

function validateLogicalOperator(operator) {
    const validLogical = ['AND', 'OR'];
    if (!validLogical.includes(operator)) {
        return 'AND'; // AND is safest
    }
    return operator;
}

function validateNature(nature) {
    const validNatures = [
        'Adamant', 'Modest', 'Jolly', 'Timid', 'Bold', 'Impish',
        'Calm', 'Careful', 'Naive', 'Hasty', 'Brave', 'Quiet',
        'Rash', 'Lonely', 'Mild', 'Relaxed'
    ];

    if (!validNatures.includes(nature)) {
        throw new Error('Invalid Pokemon nature');
    }

    return nature;
}

// initialize connection pool
async function initializeConnectionPool() {
    try {
        await oracledb.createPool(dbConfig);
        console.log('Connection pool started');
    } catch (err) {
        console.error('Initialization error: ' + err.message);
    }
}

async function closePoolAndExit() {
    console.log('\nTerminating');
    try {
        await oracledb.getPool().close(10); // 10 seconds grace period for connections to finish
        console.log('Pool closed');
        process.exit(0);
    } catch (err) {
        console.error(err.message);
        process.exit(1);
    }
}

initializeConnectionPool();

process
    .once('SIGTERM', closePoolAndExit)
    .once('SIGINT', closePoolAndExit);

// ----------------------------------------------------------
// Wrapper to manage OracleDB actions, simplifying connection handling.
async function withOracleDB(action) {
    let connection;
    try {
        connection = await oracledb.getConnection(); // Gets a connection from the default pool 
        return await action(connection);
    } catch (err) {
        console.error(err);
        throw err;
    } finally {
        if (connection) {
            try {
                await connection.close();
            } catch (err) {
                console.error(err);
            }
        }
    }
}

// ----------------------------------------------------------
// Core functions for database operations
// Modify these functions, especially the SQL queries, based on your project's requirements and design.
async function testOracleConnection() {
    return await withOracleDB(async (connection) => {
        return true;
    }).catch(() => {
        return false;
    });
}

async function initiatePokemonDB() {
    return await withOracleDB(async (connection) => {
        try {
            // Read SQL files
            const resetSQL = fs.readFileSync(path.join(__dirname, '../database/reset.sql'), 'utf8');
            const createSQL = fs.readFileSync(path.join(__dirname, '../database/create_pokemon_db.sql'), 'utf8');
            const insertSQL = fs.readFileSync(path.join(__dirname, '../database/insert_data.sql'), 'utf8');

            // Execute reset (drop tables)
            console.log('Dropping existing tables...');
            const resetBlocks = resetSQL.split('/').filter(block => block.trim());
            for (const block of resetBlocks) {
                if (block.trim() && !block.trim().startsWith('PURGE')) {
                    try {
                        await connection.execute(block.trim());
                    } catch (err) {
                        console.log('Reset block failed (may be normal):', err.message);
                    }
                }
            }

            try {
                await connection.execute('PURGE RECYCLEBIN');
            } catch (err) {
                console.log('Purge recyclebin failed (may be normal):', err.message);
            }

            await connection.commit();
            console.log('Committed drops');

            // Execute create tables
            console.log('Creating tables...');
            const createStatements = createSQL.split(';').filter(stmt => stmt.trim());
            let tableCount = 0;
            for (const statement of createStatements) {
                if (statement.trim()) {
                    try {
                        await connection.execute(statement.trim());
                        tableCount++;
                        console.log(`Created table ${tableCount}`);
                    } catch (err) {
                        console.error('Error creating table:', err.message);
                    }
                }
            }
            console.log(`Total tables created: ${tableCount}`);

            await connection.commit();
            console.log('Committed table creation');

            // Execute inserts
            console.log('Inserting data...');
            const insertStatements = insertSQL.split(';').filter(stmt => {
                const trimmed = stmt.trim();
                return trimmed && trimmed.toLowerCase().startsWith('insert');
            });

            console.log(`Found ${insertStatements.length} insert statements`);

            let successfulInserts = 0;
            for (let i = 0; i < insertStatements.length; i++) {
                const statement = insertStatements[i].trim();
                if (statement) {
                    try {
                        await connection.execute(statement);
                        successfulInserts++;
                        if (successfulInserts % 10 === 0) {
                            console.log(`Successfully executed ${successfulInserts} insert statements...`);
                        }
                    } catch (err) {
                        console.error(`Insert statement ${i + 1} failed:`, err.message);
                        console.error('Statement:', statement.substring(0, 100) + '...');
                    }
                }
            }

            await connection.commit();
            console.log('Committed all inserts');

            console.log(`Successfully executed ${successfulInserts} out of ${insertStatements.length} insert statements`);

            // Verify data insertion
            try {
                const testResult = await connection.execute('SELECT COUNT(*) FROM Trainer');
                console.log('Trainers in database after insert:', testResult.rows[0][0]);
            } catch (err) {
                console.error('Error checking trainer count:', err.message);
            }

            try {
                const testResult2 = await connection.execute('SELECT COUNT(*) FROM Pokemon_1');
                console.log('Pokemon in database after insert:', testResult2.rows[0][0]);
            } catch (err) {
                console.error('Error checking pokemon count:', err.message);
            }

            console.log('Pokemon database setup complete!');
            return true;
        } catch (err) {
            console.error('Error setting up Pokemon database:', err);
            try {
                await connection.rollback();
                console.log('Rolled back due to error');
            } catch (rollbackErr) {
                console.error('Error during rollback:', rollbackErr);
            }
            return false;
        }
    }).catch((err) => {
        console.error('Database connection error:', err);
        return false;
    });
}

// FETCH FUNCTIONS
async function fetchTrainersFromDb() {
    return await withOracleDB(async (connection) => {
        console.log('Fetching trainers...');
        const result = await connection.execute('SELECT * FROM Trainer ORDER BY trainer_id');
        console.log('Trainers result:', result.rows.length, 'rows');
        console.log('First trainer:', result.rows[0]);
        return result.rows;
    }).catch((err) => {
        console.error('Error fetching trainers:', err);
        return [];
    });
}

async function fetchPlayersFromDb() {
    return await withOracleDB(async (connection) => {
        const result = await connection.execute(`
            SELECT p.trainer_id, t.name, p.money 
            FROM Player p, Trainer t
            WHERE p.trainer_id = t.trainer_id 
            ORDER BY p.trainer_id
        `);
        return result.rows;
    }).catch(() => {
        return [];
    });
}

async function fetchPokemonFromDb() {
    return await withOracleDB(async (connection) => {
        const result = await connection.execute(`
            SELECT p1.pokedex, p1.pokemon_id, p1.name, p3.pokemon_level, p1.nature, 
                   p1.HP_IV, p1.attack_IV, p1.defense_IV, p1.speed_IV, p1.ability_id, p1.trainer_id
            FROM Pokemon_1 p1, Pokemon_3 p3 
            WHERE p1.total_XP = p3.total_XP
            ORDER BY p1.pokedex, p1.pokemon_id
        `);
        return result.rows;
    }).catch(() => {
        return [];
    });
}

async function fetchLearnedMovesFromDb() {
    return await withOracleDB(async (connection) => {
        const result = await connection.execute(`
            SELECT lm.pokedex, lm.pokemon_id, lm.move_id, p.name as pokemon_name, m.name as move_name
            FROM Pokemon_Has_Learned_Move lm, Pokemon_1 p, Move m
            WHERE lm.pokedex = p.pokedex AND lm.pokemon_id = p.pokemon_id AND lm.move_id = m.move_id
            ORDER BY lm.pokedex, lm.pokemon_id, lm.move_id
        `);
        return result.rows;
    }).catch(() => {
        return [];
    });
}

async function fetchSpeciesFromDb() {
    return await withOracleDB(async (connection) => {
        const result = await connection.execute('SELECT * FROM Species ORDER BY pokedex');
        return result.rows;
    }).catch(() => {
        return [];
    });
}

async function fetchMovesFromDb() {
    return await withOracleDB(async (connection) => {
        const result = await connection.execute('SELECT move_id, name, type_name, power, pp, accuracy FROM Move ORDER BY move_id');
        return result.rows;
    }).catch(() => {
        return [];
    });
}

async function fetchAbilitiesFromDb() {
    return await withOracleDB(async (connection) => {
        const result = await connection.execute('SELECT * FROM Ability ORDER BY ability_id');
        return result.rows;
    }).catch(() => {
        return [];
    });
}

async function fetchNaturesFromDb() {
    return await withOracleDB(async (connection) => {
        const result = await connection.execute('SELECT * FROM Pokemon_2 ORDER BY nature');
        return result.rows;
    }).catch(() => {
        return [];
    });
}

// INSERT FUNCTIONS
async function insertTrainer(trainerId, name, locationName) {
    return await withOracleDB(async (connection) => {
        // Server-side validation
        const validTrainerId = validateInteger(trainerId, 'Trainer ID', { required: true, min: 1 });
        const validName = validateString(name, 'Name', { required: true, maxLength: 255, pattern: /^[a-zA-Z0-9\s\-\.']+$/ });
        const validLocation = validateString(locationName, 'Location', { maxLength: 40, allowNull: true });

        const result = await connection.execute(
            `INSERT INTO Trainer (trainer_id, name, location_name) VALUES (:trainerId, :name, :locationName)`,
            [validTrainerId, validName, validLocation],
            { autoCommit: true }
        );

        return result.rowsAffected && result.rowsAffected > 0;
    }).catch((err) => {
        console.error('Error inserting trainer:', err);
        return false;
    });
}

async function insertPlayer(trainerId, money) {
    return await withOracleDB(async (connection) => {
        const validTrainerId = validateInteger(trainerId, 'Trainer ID', { required: true, min: 1 });
        const validMoney = validateInteger(money, 'Money', { required: true, min: 0 });

        const result = await connection.execute(
            `INSERT INTO Player (trainer_id, money) VALUES (:trainerId, :money)`,
            [validTrainerId, validMoney],
            { autoCommit: true }
        );

        return result.rowsAffected && result.rowsAffected > 0;
    }).catch((err) => {
        console.error('Error inserting player:', err);
        return false;
    });
}

async function insertPokemon(pokedex, pokemon_id, name, total_XP, nature, HP_IV, attack_IV, defense_IV, speed_IV, ability_id, trainer_id) {
    return await withOracleDB(async (connection) => {
        const validPokedex = validateInteger(pokedex, 'Pokedex', { required: true, min: 1 });
        const validPokemonId = validateInteger(pokemon_id, 'Pokemon ID', { required: true, min: 1 });
        const validName = validateString(name, 'Pokemon Name', { required: true, maxLength: 20, pattern: /^[a-zA-Z0-9\s\-\.']+$/ });
        const validXP = validateInteger(total_XP, 'Total XP', { required: true, min: 0 });
        const validNature = validateNature(nature);
        const validHPIV = validateInteger(HP_IV, 'HP IV', { required: true, min: 0, max: 31 });
        const validAttackIV = validateInteger(attack_IV, 'Attack IV', { required: true, min: 0, max: 31 });
        const validDefenseIV = validateInteger(defense_IV, 'Defense IV', { required: true, min: 0, max: 31 });
        const validSpeedIV = validateInteger(speed_IV, 'Speed IV', { required: true, min: 0, max: 31 });
        const validAbilityId = validateInteger(ability_id, 'Ability ID', { required: true, min: 1 });
        const validTrainerId = validateInteger(trainer_id, 'Trainer ID', { min: 1, allowNull: true });

        const result = await connection.execute(
            `INSERT INTO Pokemon_1 
                (pokedex, pokemon_id, name, total_XP, nature, HP_IV, attack_IV, defense_IV, speed_IV, ability_id, trainer_id) 
            VALUES 
                (:pokedex, :pokemon_id, :name, :total_XP, :nature, :HP_IV, :attack_IV, :defense_IV, :speed_IV, :ability_id, :trainer_id)`,
            [validPokedex, validPokemonId, validName, validXP, validNature, validHPIV, validAttackIV, validDefenseIV, validSpeedIV, validAbilityId, validTrainerId],
            { autoCommit: true }
        );

        return result.rowsAffected && result.rowsAffected > 0;
    }).catch((err) => {
        console.error('Error inserting Pokemon:', err);
        return false;
    });
}

async function insertPokemonHasLearnedMove(pokedex, pokemon_id, move_id) {
    return await withOracleDB(async (connection) => {
        const validPokedex = validateInteger(pokedex, 'Pokedex', { required: true, min: 1 });
        const validPokemonId = validateInteger(pokemon_id, 'Pokemon ID', { required: true, min: 1 });
        const validMoveId = validateInteger(move_id, 'Move ID', { required: true, min: 1 });

        const result = await connection.execute(
            `INSERT INTO Pokemon_Has_Learned_Move (pokedex, pokemon_id, move_id) VALUES (:pokedex, :pokemon_id, :move_id)`,
            [validPokedex, validPokemonId, validMoveId],
            { autoCommit: true }
        );

        return result.rowsAffected && result.rowsAffected > 0;
    }).catch((err) => {
        console.error('Error inserting Pokemon_Has_Learned_Move:', err);
        return false;
    });
}

// DELETE FUNCTIONS
async function deleteTrainer(trainerId) {
    return await withOracleDB(async (connection) => {
        const validTrainerId = validateInteger(trainerId, 'Trainer ID', { required: true, min: 1 });

        const result = await connection.execute(
            `DELETE FROM Trainer WHERE trainer_id = :trainerId`,
            [validTrainerId],
            { autoCommit: true }
        );

        return result.rowsAffected && result.rowsAffected > 0;
    }).catch((err) => {
        console.error('Error deleting trainer:', trainerId, err);
        return false;
    });
}

async function deletePokemon(pokedex, pokemon_id) {
    return await withOracleDB(async (connection) => {
        const validPokedex = validateInteger(pokedex, 'Pokedex', { required: true, min: 1 });
        const validPokemonId = validateInteger(pokemon_id, 'Pokemon ID', { required: true, min: 1 });

        const result = await connection.execute(
            `DELETE FROM Pokemon_1 WHERE pokedex = :pokedex AND pokemon_id = :pokemon_id`,
            [validPokedex, validPokemonId],
            { autoCommit: true }
        );

        return result.rowsAffected && result.rowsAffected > 0;
    }).catch((err) => {
        console.error('Error deleting Pokemon:', err);
        return false;
    });
}

async function deletePokemonHasLearnedMove(pokedex, pokemon_id, move_id) {
    return await withOracleDB(async (connection) => {
        const validPokedex = validateInteger(pokedex, 'Pokedex', { required: true, min: 1 });
        const validPokemonId = validateInteger(pokemon_id, 'Pokemon ID', { required: true, min: 1 });
        const validMoveId = validateInteger(move_id, 'Move ID', { required: true, min: 1 });

        const result = await connection.execute(
            `DELETE FROM Pokemon_Has_Learned_Move WHERE pokedex = :pokedex AND pokemon_id = :pokemon_id AND move_id = :move_id`,
            [validPokedex, validPokemonId, validMoveId],
            { autoCommit: true }
        );

        return result.rowsAffected && result.rowsAffected > 0;
    }).catch((err) => {
        console.error('Error deleting Pokemon_Has_Learned_Move:', err);
        return false;
    });
}

// UPDATE FUNCTIONS
async function updateTrainer(trainerId, updates) {
    const validTrainerId = validateInteger(trainerId, 'Trainer ID', { required: true, min: 1 });

    if (!(await validateTrainerExists(validTrainerId))) {
        throw new Error('Trainer not found');
    }

    const validFields = ['name', 'location_name'];
    return await updateEntity('TRAINER', 'trainer_id', validTrainerId, updates, validFields);
}

async function updatePlayer(trainerId, updates) {
    const validTrainerId = validateInteger(trainerId, 'Trainer ID', { required: true, min: 1 });
    const validFields = ['money'];
    return await updateEntity('PLAYER', 'trainer_id', validTrainerId, updates, validFields);
}

async function updatePokemon(pokedex, pokemonId, updates) {
    const validPokedex = validateInteger(pokedex, 'Pokedex', { required: true, min: 1 });
    const validPokemonId = validateInteger(pokemonId, 'Pokemon ID', { required: true, min: 1 });

    if (!(await validatePokemonExists(validPokedex, validPokemonId))) {
        throw new Error('Pokemon not found');
    }

    if (updates.ability_id !== undefined) {
        const validAbilityId = validateInteger(updates.ability_id, 'Ability ID', { required: true, min: 1 });
        updates.ability_id = validAbilityId;

        const abilityExists = await withOracleDB(async (connection) => {
            const result = await connection.execute(
                'SELECT 1 FROM Ability WHERE ability_id = :abilityId',
                [validAbilityId]
            );
            return result.rows.length > 0;
        });

        if (!abilityExists) {
            throw new Error('Ability ID does not exist');
        }
    }

    if (updates.trainer_id !== undefined && updates.trainer_id !== null) {
        const validTrainerId = validateInteger(updates.trainer_id, 'Trainer ID', { required: true, min: 1 });
        updates.trainer_id = validTrainerId;

        const trainerExists = await validateTrainerExists(validTrainerId);
        if (!trainerExists) {
            throw new Error('Trainer ID does not exist');
        }
    }

    // Validate other fields
    if (updates.name !== undefined) {
        updates.name = validateString(updates.name, 'Pokemon Name', { required: true, maxLength: 20, pattern: /^[a-zA-Z0-9\s\-\.']+$/ });
    }
    if (updates.total_XP !== undefined) {
        updates.total_XP = validateInteger(updates.total_XP, 'Total XP', { required: true, min: 0 });
    }
    if (updates.nature !== undefined) {
        updates.nature = validateNature(updates.nature);
    }
    if (updates.HP_IV !== undefined) {
        updates.HP_IV = validateInteger(updates.HP_IV, 'HP IV', { required: true, min: 0, max: 31 });
    }
    if (updates.attack_IV !== undefined) {
        updates.attack_IV = validateInteger(updates.attack_IV, 'Attack IV', { required: true, min: 0, max: 31 });
    }
    if (updates.defense_IV !== undefined) {
        updates.defense_IV = validateInteger(updates.defense_IV, 'Defense IV', { required: true, min: 0, max: 31 });
    }
    if (updates.speed_IV !== undefined) {
        updates.speed_IV = validateInteger(updates.speed_IV, 'Speed IV', { required: true, min: 0, max: 31 });
    }

    const validFields = ['name', 'total_XP', 'nature', 'HP_IV', 'attack_IV', 'defense_IV', 'speed_IV', 'ability_id', 'trainer_id'];
    return await updateEntity('POKEMON_1', ['pokedex', 'pokemon_id'], [validPokedex, validPokemonId], updates, validFields);
}

async function updatePokemonHasLearnedMove(pokedex, pokemonId, oldMoveId, newMoveId) {
    const validPokedex = validateInteger(pokedex, 'Pokedex', { required: true, min: 1 });
    const validPokemonId = validateInteger(pokemonId, 'Pokemon ID', { required: true, min: 1 });
    const validOldMoveId = validateInteger(oldMoveId, 'Old Move ID', { required: true, min: 1 });
    const validNewMoveId = validateInteger(newMoveId, 'New Move ID', { required: true, min: 1 });

    if (!(await validatePokemonExists(validPokedex, validPokemonId))) {
        throw new Error('Pokemon not found');
    }

    const oldMoveExists = await withOracleDB(async (connection) => {
        const result = await connection.execute(
            'SELECT 1 FROM Pokemon_Has_Learned_Move WHERE pokedex = :pokedex AND pokemon_id = :pokemonId AND move_id = :moveId',
            [validPokedex, validPokemonId, validOldMoveId]
        );
        return result.rows.length > 0;
    });

    if (!oldMoveExists) {
        throw new Error('Pokemon does not know the specified move');
    }

    const newMoveExists = await withOracleDB(async (connection) => {
        const result = await connection.execute(
            'SELECT 1 FROM Move WHERE move_id = :moveId',
            [validNewMoveId]
        );
        return result.rows.length > 0;
    });

    if (!newMoveExists) {
        throw new Error('New move ID does not exist');
    }

    const canLearnMove = await withOracleDB(async (connection) => {
        const result = await connection.execute(
            'SELECT 1 FROM Species_Can_Learn_Move WHERE pokedex = :pokedex AND move_id = :moveId',
            [validPokedex, validNewMoveId]
        );
        return result.rows.length > 0;
    });

    if (!canLearnMove) {
        throw new Error('This Pokemon species cannot learn the specified move');
    }

    const alreadyKnowsMove = await withOracleDB(async (connection) => {
        const result = await connection.execute(
            'SELECT * FROM Pokemon_Has_Learned_Move WHERE pokedex = :pokedex AND pokemon_id = :pokemonId AND move_id = :moveId',
            [validPokedex, validPokemonId, validNewMoveId]
        );
        return result.rows.length > 0;
    });

    if (alreadyKnowsMove) {
        throw new Error('Pokemon already knows this move');
    }

    return await withOracleDB(async (connection) => {
        const result = await connection.execute(`
            UPDATE Pokemon_Has_Learned_Move 
            SET move_id = :newMoveId 
            WHERE pokedex = :pokedex AND pokemon_id = :pokemonId AND move_id = :oldMoveId
            `,
            [validNewMoveId, validPokedex, validPokemonId, validOldMoveId],
            { autoCommit: true }
        );

        if (result.rowsAffected === 0) {
            throw new Error('No records were updated - move not found');
        }

        return true;
    });
}

// UPDATE HELPERS
async function validateTrainerExists(trainerId) {
    const validTrainerId = validateInteger(trainerId, 'Trainer ID', { required: true, min: 1 });

    return await withOracleDB(async (connection) => {
        const result = await connection.execute(
            'SELECT 1 FROM Trainer WHERE trainer_id = :id',
            [validTrainerId]
        );
        return result.rows.length > 0;
    });
}

async function validatePokemonExists(pokedex, pokemonId) {
    const validPokedex = validateInteger(pokedex, 'Pokedex', { required: true, min: 1 });
    const validPokemonId = validateInteger(pokemonId, 'Pokemon ID', { required: true, min: 1 });

    return await withOracleDB(async (connection) => {
        const result = await connection.execute(
            'SELECT 1 FROM Pokemon_1 WHERE pokedex = :pokedex AND pokemon_id = :pokemonId',
            [validPokedex, validPokemonId]
        );
        return result.rows.length > 0;
    });
}

async function updateEntity(table, idField, idValue, updates, allowedFields) {
    const validTable = validateTableName(table);

    const filteredUpdates = {};
    for (const [key, value] of Object.entries(updates)) {
        if (allowedFields.includes(key) && value !== undefined) {
            const validKey = validateColumnName(validTable, key);

            if (key === 'name' || key === 'location_name') {
                filteredUpdates[validKey] = validateString(value, key, { maxLength: key === 'name' ? 255 : 40 });
            } else if (key === 'money' || key.includes('_IV') || key === 'total_XP' || key === 'ability_id' || key === 'trainer_id') {
                filteredUpdates[validKey] = validateInteger(value, key, { min: 0 });
            } else if (key === 'nature') {
                filteredUpdates[validKey] = validateNature(value);
            } else {
                filteredUpdates[validKey] = value;
            }
        }
    }

    if (Object.keys(filteredUpdates).length === 0) {
        throw new Error('No valid fields provided for update');
    }

    const setClauses = [];
    const bindVars = {};
    let i = 1;

    for (const [key, value] of Object.entries(filteredUpdates)) {
        setClauses.push(`${key} = :val${i}`);
        bindVars[`val${i}`] = value;
        i++;
    }

    let whereClause;
    if (Array.isArray(idField)) {
        const validIdFields = idField.map(field => validateColumnName(validTable, field));
        whereClause = validIdFields.map((field, index) => `${field} = :id${index}`).join(' AND ');
        validIdFields.forEach((field, index) => {
            bindVars[`id${index}`] = Array.isArray(idValue) ? idValue[index] : idValue;
        });
    } else {
        const validIdField = validateColumnName(validTable, idField);
        whereClause = `${validIdField} = :id`;
        bindVars.id = idValue;
    }

    const query = `UPDATE ${validTable} SET ${setClauses.join(', ')} WHERE ${whereClause}`;

    return await withOracleDB(async (connection) => {
        const result = await connection.execute(query, bindVars, { autoCommit: true });

        if (result.rowsAffected === 0) {
            throw new Error('No records were updated - record not found');
        }

        return true;
    });
}

// SELECTION
async function executeSelectionQuery(conditions) {
    return await withOracleDB(async (connection) => {
        let query = `
            SELECT p1.pokedex, p1.pokemon_id, p1.name, p3.pokemon_level, p1.nature,
                   p1.HP_IV, p1.attack_IV, p1.defense_IV, p1.speed_IV, p1.ability_id, p1.trainer_id
            FROM Pokemon_1 p1, Pokemon_3 p3
            WHERE p1.total_XP = p3.total_XP
        `;
        const bindVars = {};
        let bindIndex = 1;

        if (conditions && conditions.length > 0) {
            query += " AND (";
            for (let i = 0; i < conditions.length; i++) {
                const condition = conditions[i];

                const validAttribute = validatePokemonAttribute(condition.attribute);
                const validOperator = validateOperator(condition.operator);
                const validLogical = (i > 0) ? validateLogicalOperator(conditions[i - 1].logical) : null;

                if (i > 0) {
                    query += ` ${validLogical} `;
                }

                const bindName = `val${bindIndex++}`;
                query += `${validAttribute} ${validOperator} :${bindName}`;
                bindVars[bindName] = condition.value;
            }
        }

        query += ") ORDER BY p1.pokedex, p1.pokemon_id";

        const result = await connection.execute(query, bindVars);
        return result.rows;
    }).catch((err) => {
        console.error('Error during selection query:', err);
        throw err;
    });
}

// PROJECTION
async function fetchTableNames() {
    return await withOracleDB(async (connection) => {
        const result = await connection.execute(
            `SELECT table_name FROM user_tables ORDER BY table_name`
        );

        const allowedTables = [
            'TRAINER', 'PLAYER', 'POKEMON_1', 'POKEMON_2', 'POKEMON_3',
            'SPECIES', 'MOVE', 'ABILITY', 'TYPE', 'LOCATION', 'BADGE',
            'EGG_GROUP', 'ITEM_1', 'ITEM_2', 'GYM_LEADER_1', 'GYM_LEADER_2'
        ];

        return result.rows.map(row => row[0]).filter(table => allowedTables.includes(table));
    }).catch((err) => {
        console.error('Error fetching table names:', err);
        throw err;
    });
}

async function fetchColumnNames(tableName) {
    return await withOracleDB(async (connection) => {

        const validTableName = validateTableName(tableName);

        const result = await connection.execute(
            `SELECT column_name FROM user_tab_columns WHERE table_name = :tableName ORDER BY column_name`,
            [validTableName]
        );
        return result.rows.map(row => row[0]);
    }).catch((err) => {
        console.error(`Error fetching columns for table ${tableName}:`, err);
        throw err;
    });
}

async function executeProjectionQuery(table, attributes) {
    return await withOracleDB(async (connection) => {

        const validTableName = validateTableName(table);

        if (!attributes || attributes.length === 0) {
            throw new Error('No attributes provided');
        }

        const validAttributes = attributes.map(attr => validateColumnName(validTableName, attr));

        const query = `SELECT ${validAttributes.join(', ')} FROM ${validTableName}`;
        const result = await connection.execute(query);
        return result.rows;
    }).catch((err) => {
        console.error('Error executing projection query:', err);
        throw err;
    });
}

// JOIN QUERIES
async function executeSpeciesLocationJoin(locationName = null) {
    return await withOracleDB(async (connection) => {
        let query = `
            SELECT s.pokedex, s.name as species_name, s.description, l.name as location_name, l.climate, l.terrain_type
            FROM Species s, Species_Located_In sli, Location l
            WHERE s.pokedex = sli.pokedex AND sli.location_name = l.name
        `;
        const bindVars = {};

        if (locationName) {

            const validLocation = validateString(locationName, 'Location Name', { required: true, maxLength: 40 });
            query += " AND l.name = :locationName";
            bindVars.locationName = validLocation;
        }

        query += " ORDER BY s.pokedex, l.name";

        const result = await connection.execute(query, bindVars);
        return result.rows;
    }).catch((err) => {
        console.error('Error executing species location join:', err);
        throw err;
    });
}

async function fetchLocationsForJoin() {
    return await withOracleDB(async (connection) => {
        const result = await connection.execute('SELECT DISTINCT name FROM Location ORDER BY name');
        return result.rows.map(row => row[0]);
    }).catch((err) => {
        console.error('Error fetching locations:', err);
        throw err;
    });
}

// AGGREGATION WITH GROUP BY
async function executeDefenseIVGroupBy(minDefenseIV = null) {
    return await withOracleDB(async (connection) => {
        let query = `
            SELECT t.trainer_id, t.name as trainer_name, p.name as pokemon_name, p.defense_IV
            FROM Pokemon_1 p, Trainer t
            WHERE p.trainer_id = t.trainer_id
        `;
        const bindVars = {};

        if (minDefenseIV !== null) {
            const validMinDefenseIV = validateInteger(minDefenseIV, 'Minimum Defense IV', { min: 0, max: 31 });
            query += " AND p.defense_IV >= :minDefenseIV";
            bindVars.minDefenseIV = validMinDefenseIV;
        }

        query += " ORDER BY t.trainer_id, p.defense_IV DESC";

        const result = await connection.execute(query, bindVars);
        return result.rows;
    }).catch((err) => {
        console.error('Error executing defense IV group by:', err);
        throw err;
    });
}

async function executeTrainerPokemonCount() {
    return await withOracleDB(async (connection) => {
        const query = `
            SELECT t.trainer_id, t.name as trainer_name, COUNT(p.pokemon_id) as pokemon_count,
                   AVG(p.defense_IV) as avg_defense_iv, MAX(p.defense_IV) as max_defense_iv
            FROM Trainer t
            LEFT JOIN Pokemon_1 p ON t.trainer_id = p.trainer_id
            GROUP BY t.trainer_id, t.name
            ORDER BY pokemon_count DESC, t.trainer_id
        `;

        const result = await connection.execute(query);
        return result.rows;
    }).catch((err) => {
        console.error('Error executing trainer pokemon count:', err);
        throw err;
    });
}

// AGGREGATION WITH HAVING
async function executeHighestXPHaving(minPokemonCount = 2) {
    return await withOracleDB(async (connection) => {
        const validMinCount = validateInteger(minPokemonCount, 'Minimum Pokemon Count', { required: true, min: 1, max: 20 });

        const query = `
            SELECT t.trainer_id, t.name as trainer_name, MAX(p.total_XP) as highest_xp, COUNT(p.pokemon_id) as pokemon_count
            FROM Trainer t, Pokemon_1 p 
            WHERE t.trainer_id = p.trainer_id
            GROUP BY t.trainer_id, t.name
            HAVING COUNT(p.pokemon_id) >= :minPokemonCount
            ORDER BY highest_xp DESC
        `;

        const result = await connection.execute(query, { minPokemonCount: validMinCount });
        return result.rows;
    }).catch((err) => {
        console.error('Error executing highest XP having query:', err);
        throw err;
    });
}

async function executeTrainersWithMultiplePokemon(minXP = null) {
    return await withOracleDB(async (connection) => {
        let query = `
            SELECT t.trainer_id, t.name as trainer_name, 
                   COUNT(p.pokemon_id) as pokemon_count,
                   AVG(p.total_XP) as avg_xp,
                   MAX(p.total_XP) as max_xp,
                   MIN(p.total_XP) as min_xp
            FROM Trainer t, Pokemon_1 p
            WHERE t.trainer_id = p.trainer_id
        `;
        const bindVars = { minPokemonCount: 2 };

        if (minXP !== null) {
            const validMinXP = validateInteger(minXP, 'Minimum XP', { min: 0 });
            query += " AND p.total_XP >= :minXP";
            bindVars.minXP = validMinXP;
        }

        query += `
            GROUP BY t.trainer_id, t.name
            HAVING COUNT(p.pokemon_id) >= :minPokemonCount
            ORDER BY pokemon_count DESC, max_xp DESC
        `;

        const result = await connection.execute(query, bindVars);
        return result.rows;
    }).catch((err) => {
        console.error('Error executing trainers with multiple pokemon:', err);
        throw err;
    });
}

// NESTED AGGREGATION WITH GROUP BY
async function executeNestedAggregation() {
    return await withOracleDB(async (connection) => {
        const query = `
            SELECT t.trainer_id, t.name as trainer_name, 
                   COUNT(p.pokemon_id) as pokemon_count,
                   AVG(p.total_XP) as avg_xp
            FROM Trainer t, Pokemon_1 p
            WHERE t.trainer_id = p.trainer_id
            GROUP BY t.trainer_id, t.name
            HAVING AVG(p.total_XP) > (
                SELECT AVG(total_XP) 
                FROM Pokemon_1
            )
            ORDER BY avg_xp DESC
        `;

        const result = await connection.execute(query);
        return result.rows;
    }).catch((err) => {
        console.error('Error executing nested aggregation:', err);
        throw err;
    });
}

async function executeTrainersAboveAverageXP() {
    return await withOracleDB(async (connection) => {
        const query = `
            SELECT trainer_stats.trainer_id, 
                   trainer_stats.trainer_name,
                   trainer_stats.pokemon_count,
                   trainer_stats.avg_trainer_xp,
                   global_stats.overall_avg_xp
            FROM (
                SELECT t.trainer_id, t.name as trainer_name, 
                       COUNT(p.pokemon_id) as pokemon_count,
                       AVG(p.total_XP) as avg_trainer_xp
                FROM Trainer t, Pokemon_1 p
                WHERE t.trainer_id = p.trainer_id
                GROUP BY t.trainer_id, t.name
            ) trainer_stats, (
                SELECT AVG(total_XP) as overall_avg_xp
                FROM Pokemon_1
            ) global_stats
            WHERE trainer_stats.avg_trainer_xp > global_stats.overall_avg_xp
            ORDER BY trainer_stats.avg_trainer_xp DESC
        `;

        const result = await connection.execute(query);
        return result.rows;
    }).catch((err) => {
        console.error('Error executing trainers above average XP:', err);
        throw err;
    });
}

// DIVISION

async function executeSpeciesWithAllTypes(typeNames = []) {
    return await withOracleDB(async (connection) => {
        if (!typeNames || typeNames.length === 0) {

            const query = `
                SELECT s.pokedex, s.name as species_name, 
                       LISTAGG(sht.type_name, ', ') WITHIN GROUP (ORDER BY sht.type_name) as types
                FROM Species s, Species_Has_Type sht
                WHERE s.pokedex = sht.pokedex
                GROUP BY s.pokedex, s.name
                ORDER BY s.pokedex
            `;
            const result = await connection.execute(query);
            return result.rows;
        }

        const validTypes = [];
        const validTypeNames = ['Normal', 'Fire', 'Water', 'Electric', 'Grass', 'Ice', 'Fighting', 'Poison', 'Ground', 'Flying', 'Psychic', 'Bug', 'Rock', 'Ghost', 'Dragon', 'Dark', 'Steel', 'Fairy'];

        for (const typeName of typeNames) {
            const validatedType = validateString(typeName, 'Type Name', { required: true, maxLength: 20 });
            if (!validTypeNames.includes(validatedType)) {
                throw new Error(`Invalid type name: ${validatedType}`);
            }
            validTypes.push(validatedType);
        }

        const typeCount = validTypes.length;
        const typeBindVars = {};
        const typeConditions = validTypes.map((type, index) => {
            const bindName = `type${index}`;
            typeBindVars[bindName] = type;
            return `:${bindName}`;
        }).join(', ');

        const query = `
            SELECT s.pokedex, s.name as species_name,
                   LISTAGG(sht.type_name, ', ') WITHIN GROUP (ORDER BY sht.type_name) as types
            FROM Species s, Species_Has_Type sht
            WHERE s.pokedex = sht.pokedex
            AND s.pokedex IN (
                SELECT sht2.pokedex
                FROM Species_Has_Type sht2
                WHERE sht2.type_name IN (${typeConditions})
                GROUP BY sht2.pokedex
                HAVING COUNT(DISTINCT sht2.type_name) = :typeCount
            )
            GROUP BY s.pokedex, s.name
            ORDER BY s.pokedex
        `;

        typeBindVars.typeCount = typeCount;
        const result = await connection.execute(query, typeBindVars);
        return result.rows;
    }).catch((err) => {
        console.error('Error executing species with all types:', err);
        throw err;
    });
}

async function fetchAllTypes() {
    return await withOracleDB(async (connection) => {
        const result = await connection.execute('SELECT name FROM Type ORDER BY name');
        return result.rows.map(row => row[0]);
    }).catch((err) => {
        console.error('Error fetching types:', err);
        throw err;
    });
}

async function executeSpeciesByTypeCount(exactTypeCount = null) {
    return await withOracleDB(async (connection) => {
        let query = `
            SELECT s.pokedex, s.name as species_name, 
                   COUNT(sht.type_name) as type_count,
                   LISTAGG(sht.type_name, ', ') WITHIN GROUP (ORDER BY sht.type_name) as types
            FROM Species s, Species_Has_Type sht
            WHERE s.pokedex = sht.pokedex
            GROUP BY s.pokedex, s.name
        `;
        const bindVars = {};

        if (exactTypeCount !== null) {
            const validTypeCount = validateInteger(exactTypeCount, 'Exact Type Count', { min: 1, max: 3 });
            query += " HAVING COUNT(sht.type_name) = :exactTypeCount";
            bindVars.exactTypeCount = validTypeCount;
        }

        query += " ORDER BY type_count DESC, s.pokedex";

        const result = await connection.execute(query, bindVars);
        return result.rows;
    }).catch((err) => {
        console.error('Error executing species by type count:', err);
        throw err;
    });
}

// EXPORTS
module.exports = {
    // System functions
    testOracleConnection,
    initiatePokemonDB,

    // Fetch functions
    fetchTrainersFromDb,
    fetchPlayersFromDb,
    fetchPokemonFromDb,
    fetchLearnedMovesFromDb,
    fetchSpeciesFromDb,
    fetchMovesFromDb,
    fetchAbilitiesFromDb,
    fetchNaturesFromDb,

    // Insert functions
    insertTrainer,
    insertPlayer,
    insertPokemon,
    insertPokemonHasLearnedMove,

    // Delete functions
    deleteTrainer,
    deletePokemon,
    deletePokemonHasLearnedMove,

    // Update functions
    updateTrainer,
    updatePlayer,
    updatePokemon,
    updatePokemonHasLearnedMove,
    updateEntity,

    // Selection
    executeSelectionQuery,

    // Projection
    fetchTableNames,
    fetchColumnNames,
    executeProjectionQuery,

    // Join
    executeSpeciesLocationJoin,
    fetchLocationsForJoin,

    // Aggregation with GROUP BY
    executeDefenseIVGroupBy,
    executeTrainerPokemonCount,

    // Aggregation with HAVING
    executeHighestXPHaving,
    executeTrainersWithMultiplePokemon,

    // Nested aggregation with GROUP BY
    executeNestedAggregation,
    executeTrainersAboveAverageXP,

    // Division
    executeSpeciesWithAllTypes,
    fetchAllTypes,
    executeSpeciesByTypeCount
};