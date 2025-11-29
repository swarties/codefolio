import { createClient } from "@/lib/supabase/client";



const gitHubLoginHandler = async () => {
  const supabase = await createClient();
  const redirectTo = `${window.location.origin}/authentication/callback`;
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: "github",
    options: {
      redirectTo: redirectTo,
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
}
