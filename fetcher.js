const needle = require('needle');
const fs = require('fs');
const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

rl.question(`Enter Website: `, (siteName) => {
  rl.question('Please enter the download location: ', (downloadTo) => {
    
    console.log(`Downloading website: ${siteName} to ${downloadTo}`);

    needle.get(siteName, (error, response, body) => {
      if (error) {
        console.log('error:', error); // Print the error if one occurred
        return;
      }
      if (response && response.statusCode === 200) {
        fs.writeFile(downloadTo, body, err => {
          if (err) {
            console.error(err);
          } else {
            fs.stat(downloadTo, (err, stats) => {
              if (err) {
                throw err;
              } else {
                console.log(`Downloaded and saved ${stats.size} bytes to: ${downloadTo}`);
              }
            });
          }
         
        });
      } else {
        console.log('Failed to fetch page. Status Code:', response ? response.statusCode : 'N/A'); // Print the response status code if a response was received
      }
  
    });

    rl.close();
  });
});








