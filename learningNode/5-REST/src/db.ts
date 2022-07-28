import { Pool } from 'pg';

//dbuser:password@database.server.com:port/mydtb
const connectionString = '';

const db = new Pool({ connectionString });

export default db;