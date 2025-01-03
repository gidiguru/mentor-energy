const load = async ({ locals: { supabase } }) => {
  const { data: countries, error } = await supabase.from("countries").select("name").limit(5).order("name");
  if (error) {
    console.error("Error fetching countries:", error);
    return { countries: [] };
  }
  return { countries: countries ?? [] };
};
export {
  load
};
