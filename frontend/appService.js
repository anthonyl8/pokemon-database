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

// Update functions
async function validateTrainerExists(trainerId) {
    return await withOracleDB(async (connection) => {
        const result = await connection.execute(
            'SELECT 1 FROM Trainer WHERE trainer_id = :id', 
            [trainerId]
        );
        return result.rows.length > 0;
    });
}

async function validatePokemonExists(pokedex, pokemonId) {
    return await withOracleDB(async (connection) => {
        const result = await connection.execute(
            'SELECT 1 FROM Pokemon_1 WHERE pokedex = :pokedex AND pokemon_id = :pokemonId',
            [pokedex, pokemonId]
        );
        return result.rows.length > 0;
    });
}

async function updateTrainer(trainerId, updates) {
    if (!(await validateTrainerExists(trainerId))) {
        throw new Error('Trainer not found');
    }
    
    const validFields = ['name', 'location_name'];
    return await updateEntity('Trainer', 'trainer_id', trainerId, updates, validFields);
}

async function updatePlayer(trainerId, updates) {
    const validFields = ['money'];
    return await updateEntity('Player', 'trainer_id', trainerId, updates, validFields);
}

async function updatePokemon(pokedex, pokemonId, updates) {
    if (!(await validatePokemonExists(pokedex, pokemonId))) {
        throw new Error('Pokemon not found');
    }
    
    if (updates.ability_id !== undefined) {
        const abilityExists = await withOracleDB(async (connection) => {
            const result = await connection.execute(
                'SELECT 1 FROM Ability WHERE ability_id = :abilityId',
                [updates.ability_id]
            );
            return result.rows.length > 0;
        });
        
        if (!abilityExists) {
            throw new Error('Ability ID does not exist');
        }
    }
    
    if (updates.trainer_id !== undefined && updates.trainer_id !== null) {
        const trainerExists = await validateTrainerExists(updates.trainer_id);
        if (!trainerExists) {
            throw new Error('Trainer ID does not exist');
        }
    }
    
    const validFields = ['name', 'total_XP', 'nature', 'HP_IV', 'attack_IV', 'defense_IV', 'speed_IV', 'ability_id', 'trainer_id'];
    return await updateEntity('Pokemon_1', ['pokedex', 'pokemon_id'], [pokedex, pokemonId], updates, validFields);
}

async function updatePokemonHasLearnedMove(pokedex, pokemonId, oldMoveId, newMoveId) {
    if (!(await validatePokemonExists(pokedex, pokemonId))) {
        throw new Error('Pokemon not found');
    }
    
    const oldMoveExists = await withOracleDB(async (connection) => {
        const result = await connection.execute(
            'SELECT 1 FROM Pokemon_Has_Learned_Move WHERE pokedex = :pokedex AND pokemon_id = :pokemonId AND move_id = :moveId',
            [pokedex, pokemonId, oldMoveId]
        );
        return result.rows.length > 0;
    });
    
    if (!oldMoveExists) {
        throw new Error('Pokemon does not know the specified move');
    }
    
    const newMoveExists = await withOracleDB(async (connection) => {
        const result = await connection.execute(
            'SELECT 1 FROM Move WHERE move_id = :moveId',
            [newMoveId]
        );
        return result.rows.length > 0;
    });
    
    if (!newMoveExists) {
        throw new Error('New move ID does not exist');
    }
    
    const canLearnMove = await withOracleDB(async (connection) => {
        const result = await connection.execute(
            'SELECT 1 FROM Species_Can_Learn_Move WHERE pokedex = :pokedex AND move_id = :moveId',
            [pokedex, newMoveId]
        );
        return result.rows.length > 0;
    });
    
    if (!canLearnMove) {
        throw new Error('This Pokemon species cannot learn the specified move');
    }
    
    const alreadyKnowsMove = await withOracleDB(async (connection) => {
        const result = await connection.execute(
            'SELECT 1 FROM Pokemon_Has_Learned_Move WHERE pokedex = :pokedex AND pokemon_id = :pokemonId AND move_id = :moveId',
            [pokedex, pokemonId, newMoveId]
        );
        return result.rows.length > 0;
    });
    
    if (alreadyKnowsMove) {
        throw new Error('Pokemon already knows this move');
    }
    
    return await withOracleDB(async (connection) => {
        const result = await connection.execute(
            'UPDATE Pokemon_Has_Learned_Move SET move_id = :newMoveId WHERE pokedex = :pokedex AND pokemon_id = :pokemonId AND move_id = :oldMoveId',
            [newMoveId, pokedex, pokemonId, oldMoveId],
            { autoCommit: true }
        );
        
        if (result.rowsAffected === 0) {
            throw new Error('No records were updated - move not found');
        }
        
        return true;
    });
}

async function updateEntity(table, idField, idValue, updates, allowedFields) {
    const filteredUpdates = {};
    for (const [key, value] of Object.entries(updates)) {
        if (allowedFields.includes(key) && value !== undefined) {
            filteredUpdates[key] = value;
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
        whereClause = idField.map((field, index) => `${field} = :id${index}`).join(' AND ');
        idField.forEach((field, index) => {
            bindVars[`id${index}`] = Array.isArray(idValue) ? idValue[index] : idValue;
        });
    } else {
        whereClause = `${idField} = :id`;
        bindVars.id = idValue;
    }

    const query = `UPDATE ${table} SET ${setClauses.join(', ')} WHERE ${whereClause}`;

    return await withOracleDB(async (connection) => {
        const result = await connection.execute(query, bindVars, { autoCommit: true });
        
        if (result.rowsAffected === 0) {
            throw new Error('No records were updated - record not found');
        }
        
        return true;
    });
}

// Selection

async function fetchPokemonWithSelection(conditions) {
    return await withOracleDB(async (connection) => {
        let query = `
            SELECT p.pokedex, p.pokemon_id, p.name, p3.pokemon_level, p.nature,
                   p.HP_IV, p.attack_IV, p.defense_IV, p.speed_IV, p.ability_id, p.trainer_id
            FROM Pokemon_1 p
            JOIN Pokemon_3 p3 ON p.total_XP = p3.total_XP
        `;
        const bindVars = {};
        let i = 1;

        if (conditions && conditions.length > 0) {
            query += " WHERE ";
            conditions.forEach((condition, index) => {
                if (index > 0) {
                    query += ` ${conditions[index - 1].logical} `;
                }
                const bindName = `val${i++}`;
                query += `${condition.attribute} ${condition.operator} :${bindName}`;
                bindVars[bindName] = condition.operator.toUpperCase() === 'LIKE' ? `%${condition.value}%` : condition.value;
            });
        }

        query += " ORDER BY p.pokedex, p.pokemon_id";
        
        const result = await connection.execute(query, bindVars);
        return result.rows;
    }).catch((err) => {
        console.error('Error during pokemon selection:', err);
        throw err; // Re-throw the error to be caught by the controller
    });
}

// Projection
async function fetchTableNames() {
    return await withOracleDB(async (connection) => {
        const result = await connection.execute(
            `SELECT table_name FROM user_tables`
        );
        return result.rows.map(row => row[0]);
    }).catch((err) => {
        console.error('Error fetching table names:', err);
        throw err;
    });
}

async function fetchColumnNames(tableName) {
    return await withOracleDB(async (connection) => {
        const result = await connection.execute(
            `SELECT column_name FROM user_tab_columns WHERE table_name = :tableName`,
            [tableName.toUpperCase()]
        );
        return result.rows.map(row => row[0]);
    }).catch((err) => {
        console.error(`Error fetching columns for table ${tableName}:`, err);
        throw err;
    });
}

async function executeProjectionQuery(table, attributes) {
    return await withOracleDB(async (connection) => {
        const validTableName = table.match(/^[a-zA-Z_][a-zA-Z0-9_]*$/) ? table : null;
        if (!validTableName) {
            throw new Error('Invalid table name');
        }
        
        const validAttributes = attributes.filter(attr => attr.match(/^[a-zA-Z_][a-zA-Z0-9_]*$/));
        if (validAttributes.length === 0) {
            throw new Error('No valid attributes provided');
        }
        
        const query = `SELECT ${validAttributes.join(', ')} FROM ${validTableName}`;
        const result = await connection.execute(query);
        return result.rows;
    }).catch((err) => {
        console.error('Error executing projection query:', err);
        throw err;
    });
}

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
    deletePokemon,
    updateTrainer,
    updatePlayer,
    updatePokemon,
    updatePokemonHasLearnedMove,
    updateEntity,
    // Fetch functions for all tables
    fetchTrainersFromDb,
    fetchPlayersFromDb,
    fetchPokemonFromDb,
    fetchLearnedMovesFromDb,
    fetchSpeciesFromDb,
    fetchMovesFromDb,
    fetchAbilitiesFromDb,
    fetchNaturesFromDb,
    // Selection
    fetchPokemonWithSelection,
    // Projection functions
    fetchTableNames,
    fetchColumnNames,
    executeProjectionQuery
};