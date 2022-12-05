import GeracaoMIPS from "../GeracaoMIPS";
import TabelaSimbolos from "../TabelaSimbolos";
import Token from "../Token";
import Expr2 from "./Expr2";

type ExprAnaliseProps = {
  value: 'string' | 'int' | 'char' | 'boolean'
  op: Token
} | null

export default class Expr {
  public valor: Token;
  public expr2: Expr2;


  constructor(valor: Token, expr2: Expr2) {
    this.valor = valor;
    this.expr2 = expr2;
  }

  evaluate(props: ExprAnaliseProps | null) {
    console.log('evaluate')
    console.log(props)
    const tabSimbolos = TabelaSimbolos.getInstance()

    let rightValue = ''

    if (this.valor.token === 'ID') {
      const variable = tabSimbolos.checarVar(this.valor.text)
      if (!variable.tipoDado) throw new Error("Variável sem tipo???");

      rightValue = variable.tipoDado
    } else {
      if (this.valor.token === 'STRING') rightValue = 'string'
      if (this.valor.token === 'INT') rightValue = 'int'
    }

    if (props) {
      const { value, op } = props
      switch (value) {
        case 'string':
          switch (op.token) {
            case 'MENOS':
            case 'MULT':
            case 'DIV':
              throw new Error(`Impossível realizar a operação ${op.token} em strings`);

            case 'MAIS':
              return 'string'
            case 'OP_COMP':
              return 'boolean'

            default:
              throw new Error(`Erro - string lado esquerdo, operador ${op.token} , ${rightValue} lado direito`);
          }

        case 'int':
          switch (op.token) {
            case 'MENOS':
            case 'MULT':
            case 'MAIS':
            case 'DIV':
              if (rightValue !== 'int')
                throw new Error(`Impossível realizar a operação ${op.token} em int`);

              return 'int'
            case 'OP_COMP':
              return 'boolean'

            default:
              throw new Error(`Erro - int lado esquerdo, operador ${op.token} , ${rightValue} lado direito`);
          }
        case 'boolean':
          switch (op.token) {
            case 'MENOS':
            case 'MULT':
            case 'MAIS':
            case 'DIV':
              throw new Error(`Impossível realizar a operação ${op.token} em boolean`);

            case 'OP_COMP':
              return 'boolean'

            default:
              throw new Error(`Erro - boolean lado esquerdo, operador ${op.token} , ${rightValue} lado direito`);
          }
        case 'char':
          switch (op.token) {
            case 'MENOS':
            case 'MULT':
            case 'DIV':
              throw new Error(`Impossível realizar a operação ${op.token} em char`);

            case 'MAIS':
              return 'string'
            case 'OP_COMP':
              return 'boolean'

            default:
              throw new Error(`Erro - char lado esquerdo, operador ${op.token} , ${rightValue} lado direito`);
          }

        default:
          console.log('value')
          console.log(value)
          throw new Error("Tipo lado esquerdo não identificado");
          ;
      }
    }
    console.log(rightValue);


    return rightValue
  }


  analisar(props: ExprAnaliseProps | null): string {
    const tipo = this.evaluate(props || null)

    if (this.expr2) return this.expr2.analisar(tipo as "string" | "int" | "boolean" | "char")
    return tipo
  }

  escreverCodigo(props: ExprAnaliseProps | null) {
    const geracaoMips = GeracaoMIPS.getInstance()
    let registrador = '$t0'
    if (props) registrador = '$t1'
    let rightValue = ''

    switch (this.valor.token) {
      case 'ID':
        const variavel = geracaoMips.getVariavel(this.valor.text)
        switch (variavel) {
          case '.word':
            geracaoMips.pushCodigo(`lw ${registrador}, ${this.valor.text}`)
            rightValue = 'int'
            break;
          case '.float':

            break;
          case '.double':

            break;
          case '.asciiz':

            break;
          case '.byte':

            break;
          default:
            break;
        }
        break;

      case 'STRING':
        rightValue = 'string'
        break;

      case 'INT':
        geracaoMips.pushCodigo(`addi ${registrador}, $zero, ${this.valor.text}`)
        rightValue = 'int'
        break;

      default:
        break;
    }

    if (props) {
      const { value, op } = props
      console.log('value')
      console.log(props)
      switch (value) {
        /* case 'string':
          switch (op.token) {
            case 'MENOS':
            case 'MULT':
            case 'DIV':
              throw new Error(`Impossível realizar a operação ${op.token} em strings`);

            case 'MAIS':
              return 'string'
            case 'OP_COMP':
              return 'boolean'

            default:
              throw new Error(`Erro - string lado esquerdo, operador ${op.token} , ${rightValue} lado direito`);
          } */

        case 'int':
          switch (op.token) {
            case 'MENOS':
              geracaoMips.pushCodigo(`sub $t0, $t0, $t1`)
              return 'int'
            case 'MULT':
              geracaoMips.pushCodigo(`mul $t0, $t0, $t1`)
              return 'int'
            case 'MAIS':
              geracaoMips.pushCodigo(`add $t0, $t0, $t1`)
              return 'int'
            case 'DIV':
              geracaoMips.pushCodigo(`div $t0, $t0, $t1`)
              return 'int'

              return 'int'
            /* case 'OP_COMP':
              return 'boolean' */

            /* default:
              throw new Error(`Erro - int lado esquerdo, operador ${op.token} , ${rightValue} lado direito`); */
          }
        /* case 'boolean':
          switch (op.token) {
            case 'MENOS':
            case 'MULT':
            case 'MAIS':
            case 'DIV':
              throw new Error(`Impossível realizar a operação ${op.token} em boolean`);

            case 'OP_COMP':
              return 'boolean'

            default:
              throw new Error(`Erro - boolean lado esquerdo, operador ${op.token} , ${rightValue} lado direito`);
          }
        case 'char':
          switch (op.token) {
            case 'MENOS':
            case 'MULT':
            case 'DIV':
              throw new Error(`Impossível realizar a operação ${op.token} em char`);

            case 'MAIS':
              return 'string'
            case 'OP_COMP':
              return 'boolean'

            default:
              throw new Error(`Erro - char lado esquerdo, operador ${op.token} , ${rightValue} lado direito`);
          } */

        default:
          throw new Error("Tipo lado esquerdo não identificado");
          ;
      }
    }
    console.log('chegou aqui em')
    console.log(rightValue)
    return rightValue
  }

  gerarCodigo(props: ExprAnaliseProps | null): string {
    console.log('aqui')
    const tipo = this.escreverCodigo(props || null)

    if (this.expr2) return this.expr2.gerarCodigo(tipo as "string" | "int" | "boolean" | "char")
    return tipo

  }
}