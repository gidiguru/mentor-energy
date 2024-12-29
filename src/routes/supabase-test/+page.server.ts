
import type { PageServerLoad } from './$types';

interface Country {
  name: string;
}

export const load: PageServerLoad = async ({ locals: { supabase } }) => {
  const { data: countries, error } = await supabase
    .from('countries')
    .select('name')
    .limit(5)
    .order('name');

  if (error) {
    console.error('Error fetching countries:', error);
    return { countries: [] };
  }

  return { countries: countries ?? [] };
};