import { Pool } from 'pg';

//dbuser:password@database.server.com:port/mydtb
const connectionString = 'postgres://ynsxfwbc:Gf7NnJuh6Lmum9okAmf8NLXwk8nVTylI@kesavan.db.elephantsql.com/ynsxfwbc';

const db = new Pool({ connectionString });

export default db;