import { createClient } from "@/lib/supabase/server";
import { NextResponse } from "next/server";

export async function GET(request) {
  const { searchParams, origin } = new URL(request.url);
  const code = searchParams.get("code");

  if (code) {
    const supabase = await createClient();

    const { data, error } = await supabase.auth.exchangeCodeForSession(code);

    if (!error && data?.user) {
      const { user } = data;
      const { user_metadata } = user;

      const { error: dbError } = await supabase.from("profiles").upsert(
        [
          {
            github_id: user_metadata?.sub,
            username: user_metadata?.user_name,
            auth_user_id: user.id,
            avatar_url: user_metadata?.avatar_url,
            repo_option: true,
          },
        ],
        { onConflict: "github_id" }
      );

      if (dbError) {
        console.error(
          "Error upserting data into database:",
          error.message || error
        );
      }

      return NextResponse.redirect(`${origin}/dashboard`);
    }
  }

  return NextResponse.redirect(
    `${origin}/authentication?error=auth_code_error`
  );
}
