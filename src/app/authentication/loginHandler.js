import { supabase } from "@/lib/supabaseClient";
const gitHubLoginHandler = async () => {
  const redirectTo = `${
    typeof window !== "undefined" ? window.location.origin : ""
  }/authentication/callback`;
  await supabase.auth.signInWithOAuth({
    provider: "github",
    options: { redirectTo },
  });
};

export default async function loginHandler() {
  try {
    await gitHubLoginHandler();
  } catch (err) {
    console.error(err);
  }
  supabase.auth.getUser();
}
