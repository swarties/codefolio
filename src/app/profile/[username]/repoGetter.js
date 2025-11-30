var githubApi = 'https://api.github.com/user/'

const defaultHeaders = {
  Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
  "User-Agent": "codefolio-app",
  Accept: "application/vnd.github+json",
};

export async function lastGetter(userid) {
    const data = await fetch(`${githubApi}${userid}/repos/?per_page=5&sort=updated/`);
    console.log(data)
}
export async function starGetter(userid) {

}

