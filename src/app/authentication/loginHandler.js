import { supabase } from "@/lib/supabaseClient";
const gitHubLoginHandler = async () => {
  const { error } = await supabase.auth.signInWithOAuth({ provider: "github" });
  if (error) console.log(error.message);
};

export default async function loginHandler() {
  try {
    await gitHubLoginHandler();
  } catch (err) {
    console.error(err);
  }
  supabase.auth.getUser();
}
