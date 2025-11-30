var githubApi = "https://api.github.com/user/";

const defaultHeaders = {
  Authorization: `Bearer ${process.env.GITHUB_PAT}`,
  "User-Agent": "Codefolio",
  Accept: "application/vnd.github+json",
};

var charSplit = 30;

export async function lastGetter(userid) {
  const reqURL = `${githubApi}${userid}/repos?per_page=5&sort=updated/`;
  const res = await fetch(reqURL, {
    headers: defaultHeaders,
    next: { revalidate: 180 },
  });

  if (!res.ok) {
    console.error("GitHub API error:", res.status, await res.text());
    throw new Error("Failed to fetch repos");
  }

  const data = await res.json();

  const repos = data.slice(0, 5).map((repo) => {
    const name = repo.name;

    const rawDesc = repo.description || "";
    const description =
      rawDesc.length > charSplit
        ? rawDesc.slice(0, charSplit) + "..."
        : rawDesc;

    const url = repo.html_url;
    return [name, description, url];
  });

  return repos;
}

export async function starGetter(userid) {
    
}
