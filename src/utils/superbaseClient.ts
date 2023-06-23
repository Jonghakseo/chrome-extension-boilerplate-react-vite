import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  "https://my-project-id.supabase.co",
  "my-anon-key"
);

export default supabase;
