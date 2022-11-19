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

const isValidUrl = urlString => {
  try {
    const newURL = new URL(urlString);
    return true;
  } catch (e) {
    return false;
  }
};

// request the file from the server

request(input, (error, response, body) => {


  if (isValidUrl(input) === false) {
    console.log("Invalid URL, please try again");
    fs.close();
    return;
  }

  // if file exists
  fs.access(file, fs.F_OK, (err) => {
    if (err) {
      console.error('File path is invalid', err);
      fs.close();
      return;
    }

    //file exists
    rl.question('File exists already, press Y to overwrite it and N to exit ', (answer) => {
      if (answer === 'y') {
        fs.writeFile(file, body, err => {
          if (err) {
            console.error(err);
          }
          // file written successfully
          console.log(`Downloaded and saved ${body.length} bytes to ${file}`);
          rl.close();
          return;
        });
      }
      if (answer === 'n') {
        rl.close();
        return;
      }
    });

  });
});
