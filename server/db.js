import dotenv from 'dotenv';
dotenv.config(); // ✅ Load .env before anything else

import { createClient } from '@supabase/supabase-js';

const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_KEY);

console.log('supabase URL:', process.env.SUPABASE_URL); // optional debug

export default supabase;
