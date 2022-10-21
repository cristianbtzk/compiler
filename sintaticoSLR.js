
(async () => {
  const getInput = require('./getInput')
  const input = await getInput()

  const nextToken = require('./lexico')

  class Queue {
    constructor() {
      this.items = []
    }

    enqueue(el) {
      this.items.unshift(el)
    }

    top() {
      return this.items[0]
    }

    dequeue() {
      return this.items.shift()
    }
  }

  let x

  const pilha = new Queue()

  pilha.enqueue('$')
  pilha.enqueue(0)

  const naoTerminais = [
    'E',
    'LI_FUN',
    'A_START',
    'FUN',
    'LI_PAR',
    'LI_PAR2',
    'LI_BLO',
    // 'CMD',
    'A_IF',
    'DECL',
    'A_ATR',
    'A_COMP',
    'A_WHILE',
    'A_PRINT',
    'OP'
  ]

  const ACTION = {
    0: { 'FUNCTION': 'S2' },
    1: { '$': 'acc' },
    2: { 'ID': 'S3' },
    3: { 'AP': 'S4' },
    4: { 'ID': 'S5' },
    5: { 'FP': 'R1', 'CMM': 'S6' },
    6: { 'ID': 'S7' },
    7: { 'CMM': 'S6' },
    8: { 'FP': 'S9' },
    9: { 'AC': 'S10' },
    10: { 'IF': 'S23', 'ID': 'S28', 'WHILE': 'S33', 'PRINT': 'S31' },
    11: { 'FC': 'R1', 'IF': 'R1', 'ID': 'R1', 'WHILE': 'R1', 'PRINT': 'R1' },
    12: { 'FC': 'S13' },
    13: { 'FUNCTION': 'R8', 'START': 'R8' },
    14: { 'FUNCTION': 'S2', 'START': 'R1' },
    15: { 'START': 'S16' },
    16: { 'AP': 'S17' },
    17: { 'ID': 'S5' },
    18: { 'FP': 'S19' },
    19: { 'AC': 'S20' },
    20: { 'IF': 'S23', 'ID': 'S28', 'WHILE': 'S33', 'PRINT': 'S31' },
    21: { 'FC': 'S22' },
    22: { '$': 'R7' },
    23: { 'AP': 'S24' },
    24: { 'ID': 'S25' },
    25: { 'MAIOR': 'S26', 'MAIOR_IGUAL': 'S26', 'MENOR': 'S26', 'MENOR_IGUAL': 'S26', 'DIF': 'S26' },
    26: { 'CONST': 'S27' },
    27: { 'FP': 'R3' },
    28: { 'ATR': 'S29' },
    29: { 'CONST': 'S30' },
    30: { 'IF': 'R3', 'ID': 'R3', 'WHILE': 'R3', 'PRINT': 'R3', 'FC': 'R3', },
    31: { 'AP': 'S32' },
    32: { 'ID': 'S35' },
    33: { 'AP': 'S34' },
    34: { 'ID': 'S25' },
    35: { 'FP': 'S36' },
    36: { 'IF': 'R4', 'ID': 'R4', 'WHILE': 'R4', 'PRINT': 'R4', 'FC': 'R4', },
    37: { 'FP': 'S38' },
    38: { 'AC': 'S39' },
    39: { 'IF': 'S23', 'ID': 'S28', 'WHILE': 'S33', 'PRINT': 'S31' },
    40: { 'FC': 'S41' },
    41: { 'IF': 'R7', 'ID': 'R7', 'WHILE': 'R7', 'PRINT': 'R7', 'FC': 'R7' },
    42: { '$': 'R2' },
    43: { 'FP': 'S44' },
    44: { 'AC': 'S45' },
    45: { 'IF': 'S23', 'ID': 'S28', 'WHILE': 'S33', 'PRINT': 'S31' },
    46: { 'FC': 'S47' },
    47: { 'IF': 'R7', 'ID': 'R7', 'WHILE': 'R7', 'PRINT': 'R7', 'FC': 'R7' },
    48: { 'FP': 'R3' },
    49: { 'FP': 'R2' },
    50: { 'FC': 'R0', 'IF': 'S23', 'ID': 'S28', 'WHILE': 'S33', 'PRINT': 'S31' },
    51: { 'FC': 'R2' },
  }

  const GOTO = {
    0: { 'FUNCTION': 14, 'START': 15, '$': 1 },
    4: { 'FP': 8 },
    5: { 'FP': 49 },
    7: { 'FP': 48 },
    10: { 'FC': 12, 'IF': 50, 'ID': 50, 'WHILE': 50, 'PRINT': 50 },
    15: { '$': 42 },
    17: { 'FP': 18 },
    20: { 'FC': 21 },
    24: { 'FP': 43 },
    34: { 'FP': 37 },
    39: { 'FC': 40 },
    45: { 'FC': 46 },
    50: { 'FC': 51, 'IF': 50, 'ID': 50, 'WHILE': 50, 'PRINT': 50}
  }

  function analisador() {
    x = nextToken(input).token

    while (true) {
      try {
        const action = ACTION[pilha.top()][x]
        console.log('\nTopo pilha ' + pilha.top());
        console.log('Token ' + x);
        console.log('Action ' + action);

        if (action && action[0] === 'S') {
          pilha.enqueue(parseInt(action.substring(1)))
          const next = nextToken(input)
          if (next)
            x = next.token
          else
            x = '$'
        } else if (action && action[0] === 'R') {
          console.log('Reduzindo');
          for (let i = 0; i < parseInt(action.substring(1)); i++) {
            pilha.dequeue()
          }
          console.log('Topo pilha após redução ' + pilha.top());

          pilha.enqueue(GOTO[pilha.top()][x])

        } else if (action === 'acc') {
          console.log('Linguagem aceita')
          return
        } else if (GOTO[pilha.top()][x]) { // Parte diferente
          pilha.enqueue(GOTO[pilha.top()][x])
        } else {
          console.log('Erro')
          console.log('Token - ' + x)
          return
        }
      } catch (error) {
        console.log(error)
        console.log('Erro sintático. Topo: ' + pilha.top() + '. Token: ' + x);
        return
      }
    }

  }


  analisador()
})()
