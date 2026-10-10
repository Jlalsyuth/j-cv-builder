import { createClient } from '@supabase/supabase-js';

// Sanitasi URL otomatis (hapus trailing slash atau /rest/v1 jika pengguna tidak sengaja menempelkannya)
const rawUrl = (import.meta.env.VITE_SUPABASE_URL || '').trim();
const sanitizedUrl = rawUrl
  .replace(/\/rest\/v1\/?$/i, '')
  .replace(/\/auth\/v1\/?$/i, '')
  .replace(/\/+$/, '');

const supabaseAnonKey = (import.meta.env.VITE_SUPABASE_ANON_KEY || '').trim();

export const isSupabaseConfigured = Boolean(
  sanitizedUrl &&
  supabaseAnonKey &&
  sanitizedUrl.startsWith('https://') &&
  !sanitizedUrl.includes('your-project') &&
  !sanitizedUrl.includes('MASUKKAN_URL')
);

// Inisialisasi Supabase client dengan URL yang sudah bersih
export const supabase = isSupabaseConfigured
  ? createClient(sanitizedUrl, supabaseAnonKey, {
      auth: {
        autoRefreshToken: true,
        persistSession: true,
        detectSessionInUrl: true,
      },
    })
  : null;
