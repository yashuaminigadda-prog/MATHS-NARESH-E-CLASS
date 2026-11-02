import { createClient } from '@supabase/supabase-js';

// Environment variables for Supabase
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL?.trim();
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY?.trim();

// Check if credentials are configured
export const isSupabaseConfigured = Boolean(
  supabaseUrl &&
  supabaseAnonKey &&
  supabaseUrl !== 'https://your-project-id.supabase.co' &&
  supabaseAnonKey !== 'your-anon-key'
);

// Fallback dummy client if credentials not yet configured
// to prevent runtime crash and allow graceful fallback to local data
const dummyUrl = 'https://dummy-project.supabase.co';
const dummyKey = 'dummy-anon-key';

export const supabase = createClient(
  isSupabaseConfigured ? supabaseUrl! : dummyUrl,
  isSupabaseConfigured ? supabaseAnonKey! : dummyKey
);

/**
 * Diagnostic helper to check connection to Supabase
 */
export async function testSupabaseConnection(): Promise<{
  connected: boolean;
  message: string;
  configured: boolean;
}> {
  if (!isSupabaseConfigured) {
    return {
      connected: false,
      configured: false,
      message: 'Supabase URL or Anon Key is missing in .env',
    };
  }

  try {
    const { error } = await supabase.from('study_resources').select('id').limit(1);
    if (error) {
      return {
        connected: false,
        configured: true,
        message: `Connected to Supabase project, but query returned: ${error.message}. (Did you run supabase/schema.sql?)`,
      };
    }
    return {
      connected: true,
      configured: true,
      message: 'Successfully connected to Supabase backend database!',
    };
  } catch (err: unknown) {
    const errorMsg = err instanceof Error ? err.message : String(err);
    return {
      connected: false,
      configured: true,
      message: `Failed to connect: ${errorMsg}`,
    };
  }
}
