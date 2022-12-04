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
    console.log('this.expr2')
    console.log(this.expr2)
    const tipo = this.evaluate(props || null)

    if (this.expr2) return this.expr2.analisar(tipo as "string" | "int" | "boolean" | "char")
    return tipo
  }
}