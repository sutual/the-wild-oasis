import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  "https://ijcnpaosqevdwvnorhgo.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImlqY25wYW9zcWV2ZHd2bm9yaGdvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjkyNTUyMTEsImV4cCI6MjA0NDgzMTIxMX0.RgFfp7AaawBPYCEimdPZe3uOUVUyttlREsXzVAkhMl0"
);

export default supabase;
