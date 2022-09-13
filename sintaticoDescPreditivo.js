
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
  pilha.enqueue('E')
  
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

  const M = {
    E: {
      'FUNCTION': ['LI_FUN'],
      'START': ['A_START']
    },
    LI_FUN: {
      'FUNCTION': ['FUN', 'LI_FUN'],
      'START': ['A_START']
    },
    A_START: {
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
    },
    LI_BLO: {
      'IF': ['A_IF', 'LI_BLO'],
      'INT': ['DECL', 'LI_BLO'],
      'ID': ['A_ATR', 'LI_BLO'],
      'WHILE': ['A_WHILE', 'LI_BLO'],
      'PRINT': ['A_PRINT', 'LI_BLO'],
      'FC': []
    },
    A_IF: {
      'IF': ['IF', 'AP', 'A_COMP', 'FP', 'AC', 'LI_BLO', 'FC']
    },
    DECL: {
      'INT': ['INT', 'ID']
    },
    A_ATR: {
      'ID': ['ID', 'ATR', 'CONST']
    },
    A_COMP: {
      'ID': ['ID', 'OP', 'CONST']
    },
    A_WHILE: {
      'WHILE': ['WHILE', 'AP', 'A_COMP', 'FP', 'AC', 'LI_BLO', 'FC']
    },
    A_PRINT: {
      'PRINT': ['PRINT', 'AP', 'ID', 'FP']
    },
    OP: {
      'MAIOR': ['MAIOR'],
      'MAIOR_IGUAL': ['MAIOR_IGUAL'],
      'MENOR': ['MENOR'],
      'MENOR_IGUAL': ['MENOR_IGUAL'],
      'COMP': ['COMP'],
    }
  }

  function analisador() {
    x = nextToken(input)
    let topo
    while (x) {
      try {
        topo = pilha.top()
        console.log("Topo: " + topo);

        if (!naoTerminais.includes(topo)) {
          // É terminal
          if (topo === x?.token) {
            console.log("## desempilha("+topo+")")
            pilha.dequeue()
            x = nextToken(input)
          } else {
            throw new Error('Token inválido 1 ')
          }
        } else {
          // busca prodoucao tabela M
          console.log(`Busca: M[${topo}][${x.token}]`);
          const producao = M[topo][x.token]
          
          console.log(producao);

          if (!producao) {
            throw new Error('Token inválido 2')
          }
          pilha.dequeue()

          const newArray = [...producao]

          newArray.reverse().forEach(el => {
            pilha.enqueue(el)
          });
          // desempilha topo
          // empilha producao
        }
      } catch (error) {
        console.log('Erro sintático. Topo: ' + topo + '. Token: ' + x.token);
        return
      }
    }

    if (pilha.top() === "$") {
      console.log('Linguagem aceita')
    }
    else {
      console.log('Linguagem não aceita')
    }
  }


  analisador()
})()
