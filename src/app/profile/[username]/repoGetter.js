var githubApi = "https://api.github.com/";

const defaultHeaders = {
  Authorization: `Bearer ${process.env.GITHUB_PAT}`,
  "User-Agent": "Codefolio",
  Accept: "application/vnd.github+json",
};

var charSplit = 50;

export async function lastGetter(userid) {
  const reqURL = `${githubApi}user/${userid}/repos?per_page=5&sort=updated/`;
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
  const loginReqURL = `${githubApi}user/${userid}`;

  const loginRes = await fetch(loginReqURL, {
    headers: defaultHeaders,
    next: { revalidate: 180 },
  });

  if (!loginRes.ok) {
    console.error("GitHub API error:", loginRes.status, await loginRes.text());
    throw new Error("Failed to fetch login name");
  }

  const loginData = await loginRes.json();

  const login = loginData.login;

  const starRepoReqURL = `${githubApi}search/repositories?q=user:${login}&sort=stars&order=desc&per_page=5`;

  const res = await fetch(starRepoReqURL, {
    headers: defaultHeaders,
    next: { revalidate: 180 },
  });

  if (!res.ok) {
    console.error("GitHub API error:", res.status, await res.text());
    throw new Error("Failed to fetch 5 starred repos");
  }

  const data = await res.json();

  const items = data.items || [];
  
  const repos = items.slice(0, 5).map((repo) => {
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
