import { supabase } from "@/lib/supabaseClient";

export default async function Page({ params }) {
    const { username } = await params;
    async function searchUsername(uname) {
        console.log('searchUsername called with:', uname);

        // ensure we query with the exact string we're receiving
        const { data, error } = await supabase
            .from('profiles')
            .select('*')
            .eq('username', uname);

        if (error) {
            console.error('Error checking username in database:', error.message || error);
            return false;
        }

        console.log('Supabase returned data:', data);

        return Array.isArray(data) && data.length > 0;
    }

    const debugVal = await searchUsername(username);
    console.log('username exists?', debugVal);
    return <div>
        <p>{username}</p>
    </div>
}
