module.exports = {
  baseBranch: "master",
  plugins: [
    "npm",
    "conventional-commits",
    "first-time-contributor",
    "all-contributors",
    "released",
  ],
  prereleaseBranches: ["next", "alpha", "beta"],
};
