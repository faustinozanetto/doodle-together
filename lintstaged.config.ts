module.exports = {
  '*.{js,jsx,ts,tsx}': (filenames) => {
    const lintStagedTasks = [`eslint --fix ${filenames.join(' ')}`, `prettier --write ${filenames.join(' ')}`];

    return lintStagedTasks;
  },
};
