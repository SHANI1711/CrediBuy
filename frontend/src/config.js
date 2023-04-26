const dotenv = require('dotenv');
dotenv.config();
export const BACKEND_URI = 'http://127.0.0.1:5001' || process.env.BACK_END_URL;
