const axios = require('axios');

const GITHUB_USERNAME = 'nikunj1112';
const GITHUB_TOKEN = process.env.GITHUB_TOKEN || '';
const GITHUB_API_URL = `https://api.github.com/users/${GITHUB_USERNAME}`;

const headers = {
  'User-Agent': 'nikunj-portfolio'
};

// @desc    Get GitHub user stats
// @route   GET /api/github/stats
// @access  Public
const getGitHubStats = async (req, res) => {
  try {
    const response = await axios.get(GITHUB_API_URL, { headers });
    const userData = response.data;

    // Get repos to calculate top languages
    const reposResponse = await axios.get(`${GITHUB_API_URL}/repos?sort=updated&per_page=100`, { headers });
    const repos = reposResponse.data;

    // Calculate top languages
    const languageCounts = {};
    repos.forEach(repo => {
      if (repo.language) {
        languageCounts[repo.language] = (languageCounts[repo.language] || 0) + 1;
      }
    });

    const topLanguages = Object.entries(languageCounts)
      .map(([language, count]) => ({ language, count }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 5);

    res.json({
      public_repos: userData.public_repos,
      followers: userData.followers,
      following: userData.following,
      topLanguages,
    });
  } catch (error) {
    console.error('GitHub API Error:', error.message);
    res.status(500).json({ message: 'Failed to fetch GitHub data' });
  }
};

// @desc    Get GitHub repositories
// @route   GET /api/github/repos
// @access  Public
const getGitHubRepos = async (req, res) => {
  try {
    const response = await axios.get(`${GITHUB_API_URL}/repos?sort=updated&per_page=20`, { headers });
    const repos = response.data.map(repo => ({
      id: repo.id,
      name: repo.name,
      description: repo.description,
      html_url: repo.html_url,
      language: repo.language,
      stargazers_count: repo.stargazers_count,
      forks_count: repo.forks_count,
      updated_at: repo.updated_at,
    }));
    res.json(repos);
  } catch (error) {
    console.error('GitHub API Error:', error.message);
    res.status(500).json({ message: 'Failed to fetch GitHub repositories' });
  }
};

module.exports = { getGitHubStats, getGitHubRepos };

