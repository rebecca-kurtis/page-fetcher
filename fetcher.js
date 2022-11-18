const fs = require('fs');
const request = require('request');

const args = process.argv;
let argRequests = args.slice(2);
let input = String(argRequests[0]);
let file = String(argRequests[1]);
let content;

console.log(input, file);

 request(input, (error, response, body) => {
  console.log('error:', error); // Print the error if one occurred
  console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
  console.log('body:', body); // Print the HTML for the Google homepage.
  content = body;
});


fs.writeFile(file, content, err => {
  if (err) {
    console.error(err);
  }
  // file written successfully
});


// fsPromises.writeFile('notes.txt', 'Hey, we changed it!\r\n', {
//   encoding: 'utf-8', flag: 'w'
// })
// .then(() => {
//   console.log('File write complete!');
// });