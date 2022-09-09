const nextToken = require('./lexico')

const pilhaEl = {
  tipo: "Terminal", // Não terminal,
  token: "Terminal" // Não terminal,
}

class Queue {
  constructor() {
    this.items = []
  }

  enqueue(el) {
    this.items.push(el)
  }

  top() {
    return this.items[0]
  }

  dequeue() {
    return this.items.shift()
  }
}

let x = nextToken()

const pilha = new Queue()

const naoTerminais = [
  'E',
  'LI_FUN',
  'START',
  'FUN',
  'LI_PAR',
  'LI_PAR1',
  'LI_PAR2',
  'LI_BLO',
  'COM',
  'A_IF',
  'DECL',
  'ATR',
  'COMP',
  'A_WHILE',
  'A_PRINT',
  'OP'
]

const M = {
  E: {
    'FUNCTION': ['FUNCTION', 'ID', 'AP', 'LI_PAR', 'FP', 'AC', 'LI_BLO', 'FC'],
    'START': ['START', 'AP', 'LI_PAR', 'FP', 'AC', 'LI_BLO', 'FC']
  },
  FUN: {
    'FUNCTION': ['FUNCTION', 'ID', 'AP', 'LI_PAR', 'FP', 'AC', 'LI_BLO', 'FC'],
  },
  LI_PAR: {
    'ID': ['ID', 'LI_PAR2'],
    'FP': []
  },
  LI_PAR2: {
    'CMM': ['CMM', 'ID', 'LI_PAR2'],
    'FP': []
  }
}

while (x) {
  let topo = pilha.top()

  if (topo?.type === 'Terminal') {
    if (topo?.token === x?.token) {
      pilha.dequeue()
      x = nextToken()
    } else {
      console.log('Erro');
      throw new Error('Errrrrrro')
    }
  } else {
    // busca prodoucao tabela M
    // producao = M[topo, X]
    // desempilha topo
    // empilha producao
  }
}


(async () => {
  let cont = 0

  const term = (token) => {
    const ret = tokens[cont]?.token === token
    cont++
    /* if (ret) cont++ */
    return ret
  }



  // COMP = term('')

  console.log(E())
})()
// (), (x), (x, y...)
// LISTA PARAMS -> VAZIO || ID || ID, ID
// LI = VAZIO | ID + LI1
// LI1 = VAZIO | , + ID + LI1

// LISTA PARAMS -> ( + [  || ID || ID, ID] + )
// LI = ( +  [) | ID + LI1]
// LI1 = ) | [, + ID + LI1]


// E -> LFUN & START || START
// E -> EL START
// EL -> VAZIO || FUN & EL

// EL -> START || FUN & EL

// E -> T | T + SOMA + CONST
// T -> ID + ATR  + CONST  

