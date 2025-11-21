
# GitHub API FETCHES :

Using https://api.github.com/user/[id]/ :

- The actual request is just one big object where you can get :
	- login (user's username)
	- avatar_url (user's avatar URL)

Using https://api.github.com/user/[id]/repos/ :

- Objects for each repo containing : 
	- name (repo name)
	- stargazers_count (amt of stars)
	- description (repo description)
	- html_url (redirect to the repo)

	 https://api.github.com/user/[id]/repos/?per_page=5&sort=updated/ :

- Objects for each repo in order of most recently updated

## For filtering by stars, I will have to :
- Fetch all repos
- Sort using the stargazers_count in an array of objects probably
- Get the IDs 0-4 to get the top 5 to display