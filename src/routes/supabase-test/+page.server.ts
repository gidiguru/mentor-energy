import type { PageServerLoad } from './$types';
import { createSupabaseServerClient } from '@supabase/auth-helpers-sveltekit';
import { PUBLIC_SUPABASE_URL, PUBLIC_SUPABASE_ANON_KEY } from '$env/static/public';

export const load: PageServerLoad = async (event) => {
  // Log environment variables (be careful in production!)
  console.log('Supabase URL:', PUBLIC_SUPABASE_URL);
  console.log('Supabase Anon Key present:', !!PUBLIC_SUPABASE_ANON_KEY);

  try {
    const supabase = createSupabaseServerClient({
      supabaseUrl: PUBLIC_SUPABASE_URL,
      supabaseKey: PUBLIC_SUPABASE_ANON_KEY,
      event
    });

    console.log('Supabase client created successfully');

    const { data, error: supabaseError } = await supabase
      .from('test')  // Use 'test' table instead of 'test_connection'
      .select('*');

    console.log('Query executed');

    if (supabaseError) {
      console.error('Detailed Supabase query error:', supabaseError);
      return {
        error: supabaseError.message,
        testData: null
      };
    }

    console.log('Data retrieved:', data);

    return {
      error: null,
      testData: data
    };
  } catch (err) {
    console.error('Full connection error details:', err);
    
    return {
      error: err instanceof Error ? err.message : 'An unknown error occurred',
      testData: null
    };
  }
};