
// This file is automatically generated. Do not edit it directly.
import { createClient } from '@supabase/supabase-js';
import type { Database } from './types';

const SUPABASE_URL = "https://eykaygxboaskedvkxjmx.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImV5a2F5Z3hib2Fza2Vkdmt4am14Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDc2NjEzODEsImV4cCI6MjA2MzIzNzM4MX0.nepuMkz0xhhj3nhM2j1eTIPv2Yw5tAKWt4s3wUsFBXU";

// Enhanced Supabase client configuration
export const supabase = createClient<Database>(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY, {
  auth: {
    storage: localStorage,
    persistSession: true,
    autoRefreshToken: true,
  }
});
