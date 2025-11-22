import { supabase } from "@/lib/supabaseClient";
const gitHubLoginHandler = async () => {
  const redirectTo = `${window.location.origin}/authentication/callback`;
  const { error } = await supabase.auth.signInWithOAuth({
    provider: "github",
    options: {
      redirectTo,
    },
  });
  if (error) throw error;
};

export default async function loginHandler() {
  try {
    // If this is the page that triggers the OAuth flow, start it (this will redirect).
    if (typeof window !== "undefined" && !window.location.pathname.includes("/authentication/callback")) {
      await gitHubLoginHandler();
      return; // the browser will redirect to the provider
    }

    // After the OAuth provider redirects back to `/authentication/callback`, retrieve the user
    const { data: userData, error: getUserError } = await supabase.auth.getUser();
    if (getUserError) {
      console.error("Error getting user:", getUserError);
      return;
    }

    const user = userData?.user;
    if (!user) {
      console.log("No user available after OAuth redirect.");
      return;
    }

    // --- Placeholder mapping: extract fields from response JSON ---
    // Replace `placeholder_field_a` etc. with the actual keys from your provider/user metadata
    const responseJson = user.user_metadata || user;
    const id = responseJson.raw_user_meta_data.sub || "";
    const username = responseJson.raw_user_meta_data.user_name || ""; // good
    const auth_id = responseJson.id || ""; // good
    const avatarurl = responseJson.raw_user_meta_data.avatar_url || "defaultC";

    // Insert a new row into your Supabase table, mapping each value to a column
    const { data: insertData, error: insertError } = await supabase
      .from("your_table")
      .insert([
        {
          github_id: id,
          username: username,
          auth_user_id: auth_id,
          avatar_url: avatarurl,
        },
      ]);

    if (insertError) {
      console.error("Insert error:", insertError);
    } else {
      console.log("Inserted row:", insertData);
    }
  } catch (err) {
    console.error(err);
  }
}
