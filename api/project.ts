async function getStars() {
  const repos = await fetch(
    "https://api.github.com/users/nshen/repos?per_page=200"
  );

  return repos.json();
}

export { getStars };
