const fs = require('fs');
const nextToken = require('./lexico')

module.exports = async function tokens() {
  return new Promise((resolve) => {
    fs.readFile('input.txt', 'utf8', (err, data) => {
      if (err) {
        console.error(err);
        return;
      }
      let token = null;
      try {
        let tokens = []
        do {
          token = nextToken(data);
          if (token) {
            tokens.push(token)
            //console.log('Token ', token.token, ' - ', token.text, ' - Linha ', token.line, ' - Início/Fim ', token.initialPosition, '/', token.finalPosition)
          }
          resolve(tokens)
        } while (token);
      } catch (error) {
        console.log(error.message)
      }
  
    })
  }) 
}