console.log('Before');


console.log('After');

getUser(1)
  .then(user => getRepo(user.name))
  .then(repos => getCommits(repos[0]))
  .then(commit => console.log(commit))
  .catch(err => console.log(err));

function getUser(id) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log('Processing...');
      resolve({ id , name: 'johnson'});
    }, 2000)
  })
}


function getRepo (username) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log(`Reading repo ${username}...`)
      resolve(['repo1', 'repo2', 'repo3']);
    }, 2000)
  })
}

function getCommits(repo) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log(`Reading commit ${repo}...`)
      resolve('commit');
    }, 2000)
  })
}
