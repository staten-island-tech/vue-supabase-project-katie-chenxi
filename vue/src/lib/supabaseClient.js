import { createClient } from '@supabase/supabase-js'

  export const supabase = createClient('https://<project>.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InlzZXJzZ2l2emhka3p0anNobmdwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTIxNTAyOTYsImV4cCI6MjAyNzcyNjI5Nn0.kMXmf_1epcmlVR_dxJwhSMZXey_SUzPC15zSeaIUcW0')

  async function signUpNewUser() {
    const { data, error } = await supabase.auth.signUp({
      email: 'example@email.com',
      password: 'example-password',
      options: {
        emailRedirectTo: 'https://example.com/welcome',
      },
    })
  }
signUpNewUser();  