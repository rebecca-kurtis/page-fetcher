const fs = require('fs');
const request = require('request');

const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const args = process.argv;
let argRequests = args.slice(2);
let input = argRequests[0];
let file = argRequests[1];

// request the file from the server

 request(input, (error, response, body) => {

  // if file exists
  fs.access(file, fs.F_OK, (err) => {
    if (err) {
      console.error('File path is invalid', err)
      // return
      fs.close()
    }
  
    //file exists
    rl.question('File exists already, press Y to overwrite it and N to exit ', (answer) => {
      if (answer === 'y') {
        fs.writeFile(file, body, err => {
          if (err) {
            console.error(err);
          }
          // file written successfully
          console.log(`Downloaded and saved ${body.length} bytes to ${file}`)
          rl.close();

        });
      }
      if (answer === 'n') {
      rl.close();
      }
    // console.log('file exists')
  })

  // fs.writeFile(file, body, err => {
  //   if (err) {
  //     console.error(err);
  //   }
  //   // file written successfully
  //   console.log(`Downloaded and saved ${body.length} bytes to ${file}`)
  });
});
