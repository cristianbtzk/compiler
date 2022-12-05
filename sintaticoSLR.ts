import Queue from './Queue';
import Token from './Token';
import TokenQueue from './TokenQueue';
import fs from 'fs';
import util from 'util';
import Semantico from './Semantico';
import GeracaoMIPS from './GeracaoMIPS';
const log_file = fs.createWriteStream(__dirname + '/debug.log', { flags: 'w' });
const log_stdout = process.stdout;

console.log = function (d: any) { //
  log_file.write(util.format(d) + '\n');
  log_stdout.write(util.format(d) + '\n');
};


(async () => {

  const getInput = require('./getInput.ts')
  const input = await getInput()

  const nextToken = require('./lexico.ts')

  let x

  const pilha = new Queue()

  const reductionTable: Record<number, string> = {
    0: 'ListaFuncao',
    5: 'ListaParam2',
    7: 'ListaParam2',
    10: 'ListaParam2',
    11: '', // Não existe
    13: 'Function',
    14: 'ListaFuncao',
    17: 'ListaParam2',
    22: 'Start',
    27: 'Comp',
    30: 'Atr',
    36: 'A_Print',
    41: 'A_While',
    42: 'Program',
    47: 'A_If',
    48: 'ListaParam2',
    49: 'ListaParam',
    50: 'ListaBloco',
    51: 'ListaBloco',
    53: 'Decl',
    54: 'ListaFuncao',
    57: 'Value',
    60: 'Expr',
    61: 'Expr2',
  }

  pilha.enqueue('$')
  pilha.enqueue(0)
  const ACTION: Record<number, Record<string, string>> = {
    0: { 'FUNCTION': 'S2', 'START': 'R0' },
    1: { '$': 'acc' },
    2: { 'ID': 'S3' },
    3: { 'AP': 'S4' },
    4: { 'TIPO': 'S55', 'FP': 'R0' },
    5: { 'FP': 'R0', 'CMM': 'S6' },
    6: { 'TIPO': 'S56' },
    7: { 'CMM': 'S6', 'FP': 'R0' },
    8: { 'FP': 'S9' },
    9: { 'AC': 'S10' },
    10: { 'IF': 'S23', 'ID': 'S28', 'WHILE': 'S33', 'PRINT': 'S31', 'TIPO': 'S52' },
    11: { 'FC': 'R1', 'IF': 'R1', 'ID': 'R1', 'WHILE': 'R1', 'PRINT': 'R1' }, // ?
    12: { 'FC': 'S13' },
    13: { 'FUNCTION': 'R8', 'START': 'R8' },
    14: { 'FUNCTION': 'S2', 'START': 'R0' },
    15: { 'START': 'S16' },
    16: { 'AP': 'S17' },
    17: { 'ID': 'S5', 'FP': 'R0' },
    18: { 'FP': 'S19' },
    19: { 'AC': 'S20' },
    20: { 'IF': 'S23', 'ID': 'S28', 'WHILE': 'S33', 'PRINT': 'S31', 'TIPO': 'S52' },
    21: { 'FC': 'S22' },
    22: { '$': 'R7' },
    23: { 'AP': 'S24' },
    24: { 'ID': 'S58', 'INT': 'S58', 'STRING': 'S58' },
    25: { 'OP_COMP': 'S26' },
    26: { 'INT': 'S27' },
    27: { 'FP': 'R3' },
    28: { 'ATR': 'S29' },
    29: { 'ID': 'S58', 'INT': 'S58', 'STRING': 'S58' },
    30: { 'IF': 'R3', 'ID': 'R3', 'WHILE': 'R3', 'PRINT': 'R3', 'FC': 'R3', 'TIPO': 'R3' },
    31: { 'AP': 'S32' },
    32: { 'ID': 'S58', 'INT': 'S58', 'STRING': 'S58' },
    33: { 'AP': 'S34' },
    34: { 'ID': 'S25' },
    35: { 'FP': 'S36' },
    36: { 'IF': 'R4', 'ID': 'R4', 'WHILE': 'R4', 'PRINT': 'R4', 'FC': 'R4', 'TIPO': 'R4' },
    37: { 'FP': 'S38' },
    38: { 'AC': 'S39' },
    39: { 'IF': 'S23', 'ID': 'S28', 'WHILE': 'S33', 'PRINT': 'S31', 'TIPO': 'S52' },
    40: { 'FC': 'S41' },
    41: { 'IF': 'R7', 'ID': 'R7', 'WHILE': 'R7', 'PRINT': 'R7', 'FC': 'R7', 'TIPO': 'R7' },
    42: { '$': 'R2' },
    43: { 'FP': 'S44' },
    44: { 'AC': 'S45' },
    45: { 'IF': 'S23', 'ID': 'S28', 'WHILE': 'S33', 'PRINT': 'S31', 'TIPO': 'S52', 'FC': 'R0' },
    46: { 'FC': 'S47' },
    47: { 'IF': 'R7', 'ID': 'R7', 'WHILE': 'R7', 'PRINT': 'R7', 'FC': 'R7', 'TIPO': 'R7' },
    48: { 'FP': 'R4' },
    49: { 'FP': 'R3' },
    50: { 'FC': 'R0', 'IF': 'S23', 'ID': 'S28', 'WHILE': 'S33', 'PRINT': 'S31', 'TIPO': 'S52' },
    51: { 'FC': 'R2' },
    52: { 'ID': 'S53' },
    53: { 'IF': 'R2', 'ID': 'R2', 'WHILE': 'R2', 'PRINT': 'R2', 'FC': 'R2', 'TIPO': 'R2' },
    54: { 'FUNCTION': 'R2', 'START': 'R2' },
    55: { 'ID': 'S5' },
    56: { 'ID': 'S7' },
    //57: { 'IF': 'R1', 'ID': 'R1', 'WHILE': 'R1', 'PRINT': 'R1', 'FC': 'R1', 'TIPO': 'R1', 'OP_COMP': 'R1', 'MENOS': 'R1', 'MAIS': 'R1', 'MULT': 'R1', 'DIV': 'R1' },
    58: { 'IF': 'R0', 'ID': 'R0', 'WHILE': 'R0', 'PRINT': 'R0', 'FC': 'R0', 'FP': 'R0', 'TIPO': 'R0', 'OP_COMP': 'S59', 'MENOS': 'S59', 'MAIS': 'S59', 'MULT': 'S59', 'DIV': 'S59' }, // CRIAR OBJETO <OP></OP>
    59: { 'ID': 'S58', 'INT': 'S58', 'STRING': 'S58' }, // CRIAR OBJETO <OP></OP>
    60: { 'IF': 'R2', 'ID': 'R2', 'WHILE': 'R2', 'PRINT': 'R2', 'FC': 'R2', 'FP': 'R2', 'TIPO': 'R2', 'OP_COMP': 'R2', 'MENOS': 'R2', 'MAIS': 'R2', 'MULT': 'R2', 'DIV': 'R2' }, // CRIAR OBJETO <OP></OP>
    61: { 'IF': 'R2', 'ID': 'R2', 'WHILE': 'R2', 'PRINT': 'R2', 'FC': 'R2', 'FP': 'R2','TIPO': 'R2', }, // CRIAR OBJETO <OP></OP>
  }

  const pilhaToken = new Queue();

  const GOTO: Record<number, Record<string, number>> = {
    0: { 'FUNCTION': 14, 'START': 15, '$': 1 },
    4: { 'FP': 8 },
    5: { 'FP': 49 },
    7: { 'FP': 48 },
    10: { 'FC': 12, 'IF': 50, 'ID': 50, 'WHILE': 50, 'PRINT': 50, 'TIPO': 50 },
    14: { 'START': 54 },
    15: { '$': 42 },
    17: { 'FP': 18 },
    20: { 'FC': 21, 'IF': 50, 'ID': 50, 'WHILE': 50, 'PRINT': 50, 'TIPO': 50 },
    24: { 'FP': 43 },
    29: { 'IF': 30, 'ID': 30, 'WHILE': 30, 'PRINT': 30, 'FC': 30, 'TIPO': 30 },
    32: { 'FP': 35 },
    34: { 'FP': 37 },
    39: { 'FC': 40 },
    45: { 'FC': 46 },
    50: { 'FC': 51, 'IF': 50, 'ID': 50, 'WHILE': 50, 'PRINT': 50, 'TIPO': 50 },
    58: { 'IF': 60, 'ID': 60, 'WHILE': 60, 'PRINT': 60, 'FC': 60, 'FP': 60, 'TIPO': 60 },
    59: { 'IF': 61, 'ID': 61, 'WHILE': 61, 'PRINT': 61, 'FC': 61, 'FP': 61, 'TIPO': 61 }

  }

  function analisador() {
    let currentToken = nextToken(input)
    x = currentToken.token
    const semantico = Semantico.getInstance()

    while (true) {
      try {

        const action = ACTION[pilha.top()][x]
        console.log('\nTopo pilha ' + pilha.top());
        console.log('Token ' + x);
        console.log('Action ' + action)

        if (action && action[0] === 'S') {
          pilha.enqueue(parseInt(action.substring(1)))
          pilhaToken.enqueue(currentToken);

          currentToken = nextToken(input)
          if (currentToken) {
            x = currentToken.token
          }
          else {
            x = '$'
          }
        } else if (action && action[0] === 'R') {
          const n = parseInt(action.substring(1))
          console.log('Reduzindo');
          let tokens: Token[] = []
          const top = pilha.top()
          for (let i = 0; i < n; i++) {
            const tokenDaPilha = pilhaToken.dequeue()
            if (tokenDaPilha !== undefined)
              tokens = [tokenDaPilha, ...tokens]

            pilha.dequeue()
          }

          if (n) {
            const produto = semantico.analise(tokens, reductionTable[top])
            pilhaToken.enqueue(produto)
          } else {
            console.log('aquji');

            pilhaToken.enqueue(null);
          }

          console.log(tokens);

          console.log('Topo pilha após redução ' + pilha.top());

          pilha.enqueue(GOTO[pilha.top()][x])

        } else if (action === 'acc') {
          console.log('Análise sintática aceita. Iniciando análise semântica: ')

          try {
            pilhaToken.top().analisar()
            console.log('Análise semântica finalizada com sucesso. Iniciando geração de código.')

            try {
              pilhaToken.top().gerarCodigo()
              const g = GeracaoMIPS.getInstance()
              g.gravarArquivo()
            } catch (error) {
              console.log(error);

              console.log('erro ao gerar código fonte');

            }
          } catch (error: any) {
            console.log('Erro semântico')
            console.log(error.message)
          }
          return
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
