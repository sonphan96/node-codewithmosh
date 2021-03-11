console.log('Before');
getUser(1,(user) => {
  console.log(user.name);

  // get repo
  getRepo(user.name, (repoArr) => {
    console.log(repoArr);
  })
});

console.log('After');

async function getUser(id, callback) {
  setTimeout(() => {
    console.log('Processing...');
    callback({ id , name: 'johnson'});
  }, 2000)
}


function getRepo (username, cb) {
  setTimeout(() => {
    console.log(`Reading repo ${username}...`)
    cb(['repo1', 'repo2', 'repo3']);
  }, 2000)
}