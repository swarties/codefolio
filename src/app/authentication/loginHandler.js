import { createClient } from "@/lib/supabase/client";

const supabase = createClient();

const gitHubLoginHandler = async () => {
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
