import { supabase } from "@/lib/supabaseClient";
const gitHubLoginHandler = async () => {
  const redirectTo = `${window.location.origin}/authentication/`;
  const { error } = await supabase.auth.signInWithOAuth({
    provider: "github",
    options: {
      redirectTo: redirectTo
    },
  });
  if (error) console.log(error.message);
};

export default async function loginHandler() {
  try {
    await gitHubLoginHandler();
  } catch (err) {
    console.error(err);
  }
  const User = await supabase.auth.getUser();

}
