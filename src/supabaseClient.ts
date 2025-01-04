import { createClient } from '@supabase/supabase-js';
import { Database } from './supabase';

const supabaseUrl: any = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey: any = import.meta.env.VITE_SUPABASE_ANON_KEY;

const Supabase = createClient<Database>(supabaseUrl, supabaseAnonKey);

export default Supabase; 