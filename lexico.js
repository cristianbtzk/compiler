let pos = 0;
let text = '';
let linha = 1;
let inicio = 1;
let fim = 1;

let linhaPos = 1;

const isSpace = (c) => {
  if (!c) return false
  if (/\s|\t|\n/.test(c))
    return true;
}

const isDigit = (c) => {
  if (!c) return false
  if (/[0-9]+/.test(c))
    return true;
}

const isChar = (c) => {
  if (!c) return false

  if (/[a-zA-Z]+/.test(c))
    return true;
}

const isDel = (c) => {
  if (!c) return false
  if (/[(|)|{|}]+/.test(c))
    return true;
}

const isOp = (c) => {
  if (!c) return false
  if (/<|>|=|!/.test(c))
    return true;
}

const addChar = (c) => {
  linhaPos++;
  text += c;
}

const incLine = () => {
  linha++;
}

const checkNewLine = (c) => {
  if(c === '\n') incLine()
}

const incLinePos = () => {
  linhaPos++;
}

const inc = () => {
  pos++;
}

const dec = () => {
  pos--;
}

const nextToken = (data) => {
  if (data.length <= pos)
    return null
  text = "";
  let estado = 0;
  while (true) {
    const currentChar = data[pos];
    switch (estado) {
      case 0:
        inicial = linePos;
        if (currentChar === 'i') {
          estado = 1
          addChar(currentChar)
          inc()
        }
        else if (currentChar === 'f') {
          estado = 3
          addChar(currentChar)
          inc()
        }
        else if (currentChar === 'p') {
          estado = 6
          addChar(currentChar)
          inc()
        } else if (currentChar === '(') {
          estado = 12;
          addChar(currentChar);
          inc();
          return {
            token: 'AP',
            text,
            initialPosition,
            finalPosition: initialPosition,
            line: linha,
          }
        } else if (currentChar === ')') {
          //estado = 13;
          addChar(currentChar);
          inc();
          return {
            token: 'FP',
            text,
            initialPosition,
            finalPosition: initialPosition,
            line: linha,
          }
        } else if (currentChar === '{') {
          //estado = 14;
          addChar(currentChar);
          inc();
          return {
            token: 'AC',
            text,
            initialPosition,
            finalPosition: initialPosition,
            line: linha,
          }
        } else if (currentChar === '}') {
          //estado = 15;
          addChar(currentChar);
          inc();
          return {
            token: 'FC',
            text,
            initialPosition,
            finalPosition: initialPosition,
            line: linha,
          }
        } else if (currentChar === '-') {
          //estado = 16;
          addChar(currentChar);
          inc();
          return {
            token: 'MENOS',
            text,
            initialPosition,
            finalPosition: initialPosition,
            line: linha,
          }
        } else if (currentChar === '+') {
          //estado = 17;
          addChar(currentChar);
          inc();
          return {
            token: 'MAIS',
            text,
            initialPosition,
            finalPosition: initialPosition,
            line: linha,
          }
        } else if (currentChar === '*') {
          //estado = 18;
          addChar(currentChar);
          inc();
          return {
            token: 'MULT',
            text,
            initialPosition,
            finalPosition: initialPosition,
            line: linha,
          }
        } else if (currentChar === '/') {
          //estado = 19;
          addChar(currentChar);
          inc();
          return {
            token: 'DIV',
            text,
            initialPosition,
            finalPosition: initialPosition,
            line: linha,
          }
        } else if (currentChar === '>') {
          estado = 20;
          addChar(currentChar);
          inc();
        } else if (currentChar === '<') {
          estado = 21;
          addChar(currentChar);
          inc();
        } else if (currentChar === '!') {
          estado = 22;
          addChar(currentChar);
          inc();
        } else if (currentChar === '=') {
          estado = 23;
          addChar(currentChar);
          inc();
        } else if (isSpace(currentChar)) {
          inc();
        } else if (isChar(currentChar)) {
          addChar(currentChar)
          estado = 11;
          inc();
        } else if (isDigit(currentChar)) {
          estado = 24;
          addChar(currentChar);
          inc();
        }

        checkNewLine(currentChar);
        incLinePos();
        
        break;

      case 1:
        if (currentChar === 'f') {
          estado = 2
          addChar(currentChar)
          inc()
        }
        else if (isChar(currentChar) || isDigit(currentChar)) {
          estado = 11
          addChar(currentChar)
          inc()
        }
        if (isOp(currentChar) || isSpace(currentChar) || isDel(currentChar)|| currentChar === undefined) {
          return {
            token: 'ID',
            text,
            initialPosition,
            finalPosition: initialPosition,
            line: linha,
          }
        }

        break

      case 2:
        if (isChar(currentChar) || isDigit(currentChar)) {
          estado = 11
          addChar(currentChar)
          inc()
        } else return {
          token: 'IF',
          text,
          initialPosition,
          finalPosition: initialPosition,
          line: linha,
        }
        break
      case 3:
        if (currentChar === 'o') {
          estado = 4
          addChar(currentChar)
          inc()
        }
        else if (isChar(currentChar) || isDigit(currentChar)) {
          estado = 11
          addChar(currentChar)
          inc()
        } else if (isOp(currentChar) || isSpace(currentChar) || currentChar === undefined) {
          estado = 0;
          return {
            token: 'ID',
            text,
            initialPosition,
            finalPosition: initialPosition,
            line: linha,
          }
        }
        break
      case 4:
        if (currentChar === 'r') {
          estado = 5
          addChar(currentChar)
          inc()
        }
        else if (isChar(currentChar) || isDigit(currentChar)) {
          estado = 11
          addChar(currentChar)
          inc()
        } else if (isOp(currentChar) || isSpace(currentChar) || currentChar === undefined) {
          estado = 0;
          return {
            token: 'ID',
            text,
            initialPosition,
            finalPosition: initialPosition,
            line: linha,
          }
        }
        break

      case 5:
        if (isChar(currentChar) || isDigit(currentChar)) {
          estado = 11
          addChar(currentChar)
          inc()
        } else if (isOp(currentChar) || isSpace(currentChar) || currentChar === undefined) {
          estado = 0;
          return {
            token: 'FOR',
            text,
            initialPosition,
            finalPosition: initialPosition,
            line: linha,
          }
        }
        break

      case 6:
        if (currentChar === 'r') {
          estado = 7
          addChar(currentChar)
          inc()
        }
        else if (isChar(currentChar) || isDigit(currentChar)) {
          estado = 11
          addChar(currentChar)
          inc()
        } else if (isOp(currentChar) || isSpace(currentChar) || currentChar === undefined) {
          estado = 0;
          return {
            token: 'ID',
            text,
            initialPosition,
            finalPosition: initialPosition,
            line: linha,
          }
        }
        break

      case 7:
        if (currentChar === 'i') {
          estado = 8
          addChar(currentChar)
          inc()
        }
        else if (isChar(currentChar) || isDigit(currentChar)) {
          estado = 11
          addChar(currentChar)
          inc()
        } else if (isOp(currentChar) || isSpace(currentChar) || currentChar === undefined) {
          estado = 0;
          return {
            token: 'ID',
            text,
            initialPosition,
            finalPosition: initialPosition,
            line: linha,
          }
        }
        break

      case 8:
        if (currentChar === 'n') {
          estado = 9
          addChar(currentChar)
          inc()
        }
        else if (isChar(currentChar) || isDigit(currentChar)) {
          estado = 11
          addChar(currentChar)
          inc()
        } else if (isOp(currentChar) || isSpace(currentChar) || currentChar === undefined) {
          estado = 0;
          return {
            token: 'ID',
            text,
            initialPosition,
            finalPosition: initialPosition,
            line: linha,
          }
        }
        break

      case 9:
        if (currentChar === 't') {
          estado = 10
          addChar(currentChar)
          inc()
        }
        else if (isChar(currentChar) || isDigit(currentChar)) {
          estado = 11
          addChar(currentChar)
          inc()
        } else if (isOp(currentChar) || isSpace(currentChar) || currentChar === undefined) {
          estado = 0;
          return {
            token: 'ID',
            text,
            initialPosition,
            finalPosition: initialPosition,
            line: linha,
          }
        }
        break

      case 10:
        if (isChar(currentChar) || isDigit(currentChar)) {
          estado = 11
          addChar(currentChar)
          inc()
        } else if (isOp(currentChar) || isSpace(currentChar) || isDel(currentChar) || currentChar === undefined) {
          estado = 0;
          return {
            token: 'PRINT',
            text,
            initialPosition,
            finalPosition: initialPosition,
            line: linha,
          }
        }
        break;

      case 11:
        if (isChar(currentChar) || isDigit(currentChar)) {
          addChar(currentChar)
          inc()
        } else if (isOp(currentChar) || isSpace(currentChar) || isDel(currentChar) || currentChar === undefined) {
          estado = 0;
          inc();
          return {
            token: 'ID',
            text,
            initialPosition,
            finalPosition: initialPosition,
            line: linha,
          }
        }
        break;

      case 20:
        inc();
        addChar(currentChar);
        if (currentChar === '=') {
          return {
            token: 'MAIOR_IGUAL',
            text,
            initialPosition,
            finalPosition: initialPosition,
            line: linha,
          }
        }
        return {
          token: 'MAIOR',
          text,
          initialPosition,
          finalPosition: initialPosition,
          line: linha,
        }

      case 21:
        inc();
        addChar(currentChar);
        if (currentChar === '=') {
          return {
            token: 'MENOR_IGUAL',
            text,
            initialPosition,
            finalPosition: initialPosition,
            line: linha,
          }
        }
        return {
          token: 'MENOR',
          text,
          initialPosition,
          finalPosition: initialPosition,
          line: linha,
        }

      case 22:
        inc();
        addChar(currentChar);
        if (currentChar === '=') {
          return {
            token: 'DIF',
            text,
            initialPosition,
            finalPosition: initialPosition,
            line: linha,
          }
        }
        return {
          token: 'NOT',
          text,
          initialPosition,
          finalPosition: initialPosition,
          line: linha,
        }

      case 23:
        inc();
        addChar(currentChar);
        if (currentChar === '=') {
          return {
            token: 'COMP',
            text,
            initialPosition,
            finalPosition: initialPosition,
            line: linha,
          }
        }
        return {
          token: 'ATR',
          text,
          initialPosition,
          finalPosition: initialPosition,
          line: linha,
        }

      case 24:
        if (isDigit(currentChar)) {
          addChar(currentChar);
          inc();
          estado = 24;
        } else if(isChar(currentChar)){
          addChar(currentChar);
          inc();
          throw new Error('Erro')
        } else if (isOp(currentChar) || isSpace(currentChar) || isDel(currentChar) || currentChar === undefined) {
          return {
            token: 'CONST',
            text,
            initialPosition,
            finalPosition: initialPosition,
            line: linha,
          }
        }

      default:
        break;
    }
  }

}

module.exports = nextToken