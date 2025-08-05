const oracledb = require('oracledb');
const loadEnvFile = require('./utils/envUtil');

const envVariables = loadEnvFile('./.env');

const fs = require('fs');
const path = require('path');

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

async function fetchDemotableFromDb() {
    return await withOracleDB(async (connection) => {
        const result = await connection.execute('SELECT * FROM DEMOTABLE');
        return result.rows;
    }).catch(() => {
        return [];
    });
}

async function initiatePokemonDB() {
    return await withOracleDB(async (connection) => {
        try {
            // Read your SQL files
            const resetSQL = fs.readFileSync(path.join(__dirname, '../database/reset.sql'), 'utf8');
            const createSQL = fs.readFileSync(path.join(__dirname, '../database/create_pokemon_db.sql'), 'utf8');
            const insertSQL = fs.readFileSync(path.join(__dirname, '../database/insert_data.sql'), 'utf8');
            
            // Execute reset (drop tables) - split by "/" for PL/SQL blocks
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
            
            // Handle the PURGE RECYCLEBIN separately
            try {
                await connection.execute('PURGE RECYCLEBIN');
            } catch (err) {
                console.log('Purge recyclebin failed (may be normal):', err.message);
            }
            
            // Commit after drops
            await connection.commit();
            console.log('Committed drops');
            
            // Execute create tables - split by ";" 
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
            
            // Commit after creates
            await connection.commit();
            console.log('Committed table creation');
            
            // Execute inserts - now much simpler since they're individual INSERT statements
            console.log('Inserting data...');
            console.log('Insert SQL length:', insertSQL.length);
            
            // Split by semicolon and filter out empty statements
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
            
            // CRITICAL: Commit all the inserts
            await connection.commit();
            console.log('Committed all inserts');
            
            console.log(`Successfully executed ${successfulInserts} out of ${insertStatements.length} insert statements`);
            
            // Check if data was inserted
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
            // Rollback on error
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

async function insertDemotable(id, name) {
    return await withOracleDB(async (connection) => {
        const result = await connection.execute(
            `INSERT INTO DEMOTABLE (id, name) VALUES (:id, :name)`,
            [id, name],
            { autoCommit: true }
        );

        return result.rowsAffected && result.rowsAffected > 0;
    }).catch(() => {
        return false;
    });
}

async function updateNameDemotable(oldName, newName) {
    return await withOracleDB(async (connection) => {
        const result = await connection.execute(
            `UPDATE DEMOTABLE SET name=:newName where name=:oldName`,
            [newName, oldName],
            { autoCommit: true }
        );

        return result.rowsAffected && result.rowsAffected > 0;
    }).catch(() => {
        return false;
    });
}

async function countDemotable() {
    return await withOracleDB(async (connection) => {
        const result = await connection.execute('SELECT Count(*) FROM DEMOTABLE');
        return result.rows[0][0];
    }).catch(() => {
        return -1;
    });
}

// All Inserts

async function insertTrainer(trainerId, name, locationName) {
    return await withOracleDB(async (connection) => {
        const result = await connection.execute(
            `INSERT INTO Trainer (trainer_id, name, location_name) VALUES (:trainerId, :name, :locationName)`,
            [trainerId, name, locationName || null], 
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
        const result = await connection.execute(
            `INSERT INTO Player (trainer_id, money) VALUES (:trainerId, :money)`,
            [trainerId, money],
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
        const result = await connection.execute(
            `INSERT INTO Pokemon_1 
                (pokedex, pokemon_id, name, total_XP, nature, HP_IV, attack_IV, defense_IV, speed_IV, ability_id, trainer_id) 
            VALUES 
                (:pokedex, :pokemon_id, :name, :total_XP, :nature, :HP_IV, :attack_IV, :defense_IV, :speed_IV, :ability_id, :trainer_id)`,
            [pokedex, pokemon_id, name, total_XP, nature, HP_IV, attack_IV, defense_IV, speed_IV, ability_id, trainer_id || null],
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
        const result = await connection.execute(
            `INSERT INTO Pokemon_Has_Learned_Move (pokedex, pokemon_id, move_id) VALUES (:pokedex, :pokemon_id, :move_id)`,
            [pokedex, pokemon_id, move_id], // All required - no nulls allowed
            { autoCommit: true }
        );

        return result.rowsAffected && result.rowsAffected > 0;
    }).catch((err) => {
        console.error('Error inserting Pokemon_Has_Learned_Move:', err);
        return false;
    });
}

// Fetch 

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
            FROM Player p 
            JOIN Trainer t ON p.trainer_id = t.trainer_id 
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
            SELECT p.pokedex, p.pokemon_id, p.name, p3.pokemon_level, p.nature, 
                   p.HP_IV, p.attack_IV, p.defense_IV, p.speed_IV, p.ability_id, p.trainer_id
            FROM Pokemon_1 p
            JOIN Pokemon_3 p3 ON p.total_XP = p3.total_XP
            ORDER BY p.pokedex, p.pokemon_id
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
            FROM Pokemon_Has_Learned_Move lm
            JOIN Pokemon_1 p ON lm.pokedex = p.pokedex AND lm.pokemon_id = p.pokemon_id
            JOIN Move m ON lm.move_id = m.move_id
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

// All Deletes

async function deleteTrainer(trainerId) {
    return await withOracleDB(async (connection) => {
        const result = await connection.execute(
            `DELETE FROM Trainer WHERE trainer_id = :trainerId`,
            [trainerId],
            { autoCommit: true }
        );

        return result.rowsAffected && result.rowsAffected > 0;
    }).catch((err) => {
        console.error('Error deleting trainer:', trainerId, err);
        return false;
    });
}

async function deletePlayer(trainerId) {
    return await withOracleDB(async (connection) => {
        const result = await connection.execute(
            `DELETE FROM Player WHERE trainer_id = :trainerId`,
            [trainerId],
            { autoCommit: true }
        );

        return result.rowsAffected && result.rowsAffected > 0;
    }).catch((err) => {
        console.error('Error deleting player:', trainerId, err);
        return false;
    });
}

async function deletePokemon(pokedex, pokemon_id) {
    return await withOracleDB(async (connection) => {
        const result = await connection.execute(
            `DELETE FROM Pokemon_1 WHERE pokedex = :pokedex AND pokemon_id = :pokemon_id`,
            [pokedex, pokemon_id],
            { autoCommit: true }
        );

        return result.rowsAffected && result.rowsAffected > 0;
    }).catch((err) => {
        console.error('Error deleting Pokemon:', err);
        return false;
    });
}

async function updateTrainer(trainer_id, updates) {
    const setClauses = [];
    const bindParams = { trainer_id };

    let i = 1;
    for (const [key, value] of Object.entries(updates)) {
        const paramName = `val${i}`;
        setClauses.push(`${key} = :${paramName}`);
        bindParams[paramName] = value;
        i++;
    }

    const query = `
        UPDATE Trainer
        SET ${setClauses.join(', ')}
        WHERE trainer_id = :trainer_id;
    `;

    return await withOracleDB(async (connection) => {
        const result = await connection.execute(
            query,
            bindParams,
            { autoCommit: true }
        );
        return result.rowsAffected && result.rowsAffected > 0;
    }).catch((err) => {
        console.error('Error updating Trainer:', err);
        return false;
    });
}

async function updatePlayer(trainer_id, money) {
    const setClauses = [];
    const bindParams = { trainer_id };

    let i = 1;
    for (const [key, value] of Object.entries(updates)) {
        const paramName = `val${i}`;
        setClauses.push(`${key} = :${paramName}`);
        bindParams[paramName] = value;
        i++;
    }

    const query = `
        UPDATE Player
        SET ${setClauses.join(', ')}
        WHERE trainer_id = :trainer_id;
    `;

    return await withOracleDB(async (connection) => {
        const result = await connection.execute(
            query,
            bindParams,
            { autoCommit: true }
        );
        return result.rowsAffected && result.rowsAffected > 0;
    }).catch((err) => {
        console.error('Error updating Player:', err);
        return false;
    });
}

async function updatePokemon(pokedex, pokemon_id, updates) {
    const setClauses = [];
    const bindParams = { pokedex, pokemon_id };

    let i = 1;
    for (const [key, value] of Object.entries(updates)) {
        const paramName = `val${i}`;
        setClauses.push(`${key} = :${paramName}`);
        bindParams[paramName] = value;
        i++;
    }

    const query = `
        UPDATE Pokemon_1
        SET ${setClauses.join(', ')}
        WHERE pokedex = :pokedex AND pokemon_id = :pokemon_id
    `;

    return await withOracleDB(async (connection) => {
        const result = await connection.execute(
            query,
            bindParams,
            { autoCommit: true }
        );
        return result.rowsAffected && result.rowsAffected > 0;
    }).catch((err) => {
        console.error('Error updating Pokemon:', err);
        return false;
    });
}

// 

module.exports = {
    testOracleConnection,
    fetchDemotableFromDb,
    initiatePokemonDB, 
    insertDemotable, 
    updateNameDemotable, 
    countDemotable,
    // Insert functions
    insertTrainer,
    insertPlayer,
    insertPokemon,
    insertPokemonHasLearnedMove,
    // Delete functions
    deleteTrainer,
    deletePlayer,
    deletePokemon,
    // Fetch functions for all tables
    fetchTrainersFromDb,
    fetchPlayersFromDb,
    fetchPokemonFromDb,
    fetchLearnedMovesFromDb,
    fetchSpeciesFromDb,
    fetchMovesFromDb,
    fetchAbilitiesFromDb,
    fetchNaturesFromDb
};