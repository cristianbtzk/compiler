const fs = require('fs');
const nextToken = require('./lexico')

fs.readFile('input.txt', 'utf8', (err, data) => {
  if (err) {
    console.error(err);
    return;
  }
  let token = null;
 try {
  do {
    token = nextToken(data);
    if(token) {
      console.log('Token ', token.token, ' - ', token.text, ' - Linha ', token.line, ' - Início/Fim ', token.initialPosition,'/',token.finalPosition)
    }
  } while (token);
 } catch (error) {
  console.log(error.message)
 }

});