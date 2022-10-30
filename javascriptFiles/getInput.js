const fs = require('fs');

module.exports = async function tokens() {
  return new Promise((resolve) => {
    fs.readFile('input.txt', 'utf8', (err, data) => {
      if (err) {
        console.error(err);
        return;
      }
      resolve(data)
    })
  }) 
}