import { supabase } from "@/lib/supabaseClient";
import Button from "@/components/ui/button";

const gitHubLoginHandler = async () => {
    const { error } = await supabase.auth.signInWithOAuth({provider : 'github'});
    if (error) console.log(error.message) 
}

