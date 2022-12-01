import TabelaSimbolos from "../TabelaSimbolos";
import Token from "../Token";
import Expr2 from "./Expr2";

export default class Expr {
  public valor: Token;
  public expr2: Expr2;


  
  constructor(valor: Token, expr2: Expr2) {
    this.valor = valor;
    this.expr2 = expr2;
  }

  evaluate(token: Token){
    const tabSimbolos = TabelaSimbolos.getInstance()

    if(token.token === 'ID'){
      const variable = tabSimbolos.checarVar(token.text)
      if(!variable.tipoDado) throw new Error("Variável sem tipo???");
      
      return variable.tipoDado
    }

    if(token.token === 'STRING') return 'string'
    if(token.token === 'CONST') return 'int'

    return 'int'
  }


  analisar(prev: Token | null){
    console.log('this.valor.token')
    console.log(this.valor.token)

    const tipo = this.evaluate(this.valor)

    if(this.expr2) this.expr2.analisar(tipo)

    /* const tabSimbolos = TabelaSimbolos.getInstance() */

   // tabSimbolos.addSimbolo({id: this.id.text,tipo: 'var', tipoDado: this.tipo.text})
  }
}