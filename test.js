const { pause, resume } = require('./index');

/*
(async() => {
  console.log('This thread will be paused...');
  await pause('test');
  console.log('The thread resumed! success!');
})();

(async() => {
  console.log('Resuming that thread in 2.5 seconds...');
  setTimeout(() => {
    console.log('We are about to resume it!');
    resume('test');
  }, 2500);
})();

*/

(async () => {
  console.log('This thread will be paused...');
  await pause('test', 2500);
  console.log('The thread resumed automatically! Success!');
})();

(async () => {
  setTimeout(() => resume('test'), 5000);
})();