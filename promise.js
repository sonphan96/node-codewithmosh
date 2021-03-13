
const p = new Promise((resolve, reject) => {
  //kick off async work
  setTimeout(() => {
    // resolve(1);
    reject('err');
  }, 2000)
})

p.then(result => console.log(result))
  .catch(err => console.log(err));