import { supabase } from "@/lib/supabaseClient";

export default async function Page({ params }) {
  const { username } = await params;
  async function searchUsername(uname) {
    console.log("searchUsername called with:", uname);

    const { data, error } = await supabase
      .from("profiles")
      .select('username')
      .eq('username', uname); 

    if (error) {
      console.error(
        "Error checking username in database:",
        error.message || error
      );
      return false;
    }

    console.log("Supabase returned data:", data);

    return data;
  }

  var debugVal = await searchUsername(username);
  console.log("username exists?", debugVal);
  return (
    <div>
      <p>{username}</p>
    </div>
  );
}
