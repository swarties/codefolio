import fetchUserData from "./userDataFetcher";
import { supabaseAdmin } from "@/lib/supabaseAdmin";

export default async function Page({ params }) {
  const { username } = await params;
  async function CheckUserandFetchData() {
    let dUE = false;
    const { data, error } = await supabaseAdmin
      .from("profiles")
      .select("*")
      .eq("username", username);

    if (error) {
      console.log("Error contacting database:", error.message || error);
      return { dUE, data: "nodata" };
    }
    if (Array.isArray(data) && data.length > 0) {
      dUE = true;
      return { dUE, data };
    } else {
      return { dUE, data };
    }
  }

  const userInfo = await CheckUserandFetchData();

  if (!dUE) {
    
  }

  console.log(userInfo);

  return (
    <div>
      <p>{username}</p>
    </div>
  );
}

/* const pageUsername = await params;
let doesUsernameExist = false;
let userData = {};
    (async () => {
      let dUE = false;
      const { data, error } = await supabaseAdmin
        .from("profiles")
        .select("*")
        .eq("username", pageUsername);
  
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
  })(); */
