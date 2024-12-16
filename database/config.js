import mysql2 from 'mysql2/promise';
import dotenv from 'dotenv';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

dotenv.config();

console.log('Database Name:', process.env.DB_NAME);

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const dbConfig = {
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || '',
    database: process.env.DB_NAME || 'management',
    port: process.env.DB_PORT || 3306,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,
    multipleStatements: true,
    debug: false,
    supportBigNumbers: true,
    bigNumberStrings: true,
    connectTimeout: 20000,
};

const pool = mysql2.createPool(dbConfig);

async function setupDatabase() {
    let connection;

    try {
        console.log(`Connecting to database: ${dbConfig.host}/${dbConfig.database}`);
        connection = await mysql2.createConnection(dbConfig);
        console.log('Database connected successfully.');

        console.log('Setting up database file...');
        const sqlFilePath = path.join(__dirname, 'management.sql');

        if (!fs.existsSync(sqlFilePath)) {
            throw new Error(`SQL file not found: ${sqlFilePath}`);
        }

        const sql = fs.readFileSync(sqlFilePath, 'utf8');
        console.log('Database file is installing...........');

        await connection.query(`USE ${dbConfig.database}`);
        await connection.query(sql);
        console.log('Database setup  install completed successfully.');
    } catch (err) {
        console.error('Error setting up the database:', err.message);
        console.error('Error Stack:', err.stack);
    } finally {
        if (connection) {
            await connection.end();
        }
    }
}

setupDatabase().then(() => console.log('Setup completed.'));

export default pool;
