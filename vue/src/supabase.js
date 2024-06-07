import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://yodvostylbcegblvyeas.supabase.co'
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InlvZHZvc3R5bGJjZWdibHZ5ZWFzIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTcxNDUzMDE1MCwiZXhwIjoyMDMwMTA2MTUwfQ.ycqSi3LCHzq7jBep0x2I0PSd3dlDxfMuXwC8qXOK6G0'

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
