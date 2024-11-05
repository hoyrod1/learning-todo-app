import { createClient } from "@supabase/supabase-js";
const supabaseUrl = "https://wdmryufnequrkcumvggg.supabase.co";
// const supabaseKey = process.env.SUPABASE_KEY;
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6IndkbXJ5dWZuZXF1cmtjdW12Z2dnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mjk0ODI1NzgsImV4cCI6MjA0NTA1ODU3OH0.3P-wZ1jCSsyZQ-ycxbfjaq49JuGX1jo6H2D9Q_vM_Dg";
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
