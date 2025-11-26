import { supabaseAdmin } from "@/lib/supabaseAdmin";

export default async function fetchUserData({ params }, PageContinue) {
  const pageUsername = await params;
  let doesUsernameExist = false;
  let userData = {};
  (async () => {
    let dUE = false;
    const { data, error } = await supabaseAdmin
      .from("profiles")
      .select("*")
      .eq("username", uname);

    if (error) {
      console.error(
        "Error checking username in database:",
        error.message || error
      );
      dUE = false;
    }
    
    dUE = Array.isArray(data) && data.length > 0; //do this with an if to return either a value to if later for no username found page or a dataset
    doesUsernameExist = dUE;

    if (doesUsernameExist) {
        userData = data;
    } else {
        return false;
    }
})();
}
