import 'react-native-url-polyfill/auto';
import { createClient } from '@supabase/supabase-js';

// NOT: Buradaki bilgileri kendi Supabase dashboard'unuzdan alarak güncelleyin.
const supabaseUrl = 'YOUR_SUPABASE_URL';
const supabaseAnonKey = 'YOUR_SUPABASE_ANON_KEY';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
