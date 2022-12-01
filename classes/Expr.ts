import TabelaSimbolos from "../TabelaSimbolos";
import Token from "../Token";
import Expr2 from "./Expr2";

type ExprAnaliseProps = {
  value: 'string' | 'int' | 'char' | 'boolean'
  op: Token
}

const tabelaAnalise = {
  string: {
    'OP_COMP': {}, 
    'MENOS': {}, 
    'MAIS': {},
    'MULT': {} 
    
  },
  int: {
    'OP_COMP': {}, 
    'MENOS': {}, 
    'MAIS': {},
    'MULT': {} 
  },
  boolean: {
    'OP_COMP': {}, 
    'MENOS': {}, 
    'MAIS': {},
    'MULT': {} 
  },
  char: {
    'OP_COMP': {}, 
    'MENOS': {}, 
    'MAIS': {},
    'MULT': {} 
  }
}

export default class Expr {
  public valor: Token;
  public expr2: Expr2;



  constructor(valor: Token, expr2: Expr2) {
    this.valor = valor;
    this.expr2 = expr2;
  }

  evaluate(props: ExprAnaliseProps | null) {
    if (props) {

    }

    const tabSimbolos = TabelaSimbolos.getInstance()

    if (this.valor.token === 'ID') {
      const variable = tabSimbolos.checarVar(this.valor.text)
      if (!variable.tipoDado) throw new Error("Variável sem tipo???");

      return variable.tipoDado
    }

    if (this.valor.token === 'STRING') return 'string'
    if (this.valor.token === 'int') return 'int'

    return 'int'
  }


  analisar(props: ExprAnaliseProps | null) {
    console.log('this.valor.token')
    console.log(this.valor.token)

    const tipo = this.evaluate(props)

    /* if(this.expr2) this.expr2.analisar(tipo) */

    /* const tabSimbolos = TabelaSimbolos.getInstance() */

    // tabSimbolos.addSimbolo({id: this.id.text,tipo: 'var', tipoDado: this.tipo.text})
  }
}