'use server';

import { supabase } from "@/lib/supabaseClient";
import { Button } from "@/components/ui/button";

const gitHubLoginHandler = async () => {
    const { error } = await supabase.auth.signInWithOAuth({provider : 'github'});
    if (error) console.log(error.message) 
}

function ButtonOutline() {
    return <Button variant="outline">Login</Button>
}

export default function Auth() {
    return <ButtonOutline onClick={gitHubLoginHandler}></ButtonOutline>
}