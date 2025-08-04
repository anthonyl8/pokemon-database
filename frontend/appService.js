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
            
            // Execute reset (drop tables)
            console.log('Dropping existing tables...');
            const resetStatements = resetSQL.split(';').filter(stmt => stmt.trim());
            for (const statement of resetStatements) {
                if (statement.trim()) {
                    try {
                        await connection.execute(statement.trim());
                    } catch (err) {
                        console.log('Reset statement failed (may be normal):', err.message);
                    }
                }
            }
            
            // Execute create tables
            console.log('Creating tables...');
            const createStatements = createSQL.split(';').filter(stmt => stmt.trim());
            for (const statement of createStatements) {
                if (statement.trim()) {
                    await connection.execute(statement.trim());
                }
            }
            
            // Execute inserts
            console.log('Inserting data...');
            const insertStatements = insertSQL.split(';').filter(stmt => stmt.trim());
            for (const statement of insertStatements) {
                if (statement.trim()) {
                    await connection.execute(statement.trim());
                }
            }
            
            console.log('Pokemon database setup complete!');
            return true;
        } catch (err) {
            console.error('Error setting up Pokemon database:', err);
            return false;
        }
    }).catch(() => {
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

module.exports = {
    testOracleConnection,
    fetchDemotableFromDb,
    initiatePokemonDB, 
    insertDemotable, 
    updateNameDemotable, 
    countDemotable
};