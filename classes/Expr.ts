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

  analisar(){
    /* const tabSimbolos = TabelaSimbolos.getInstance()

    tabSimbolos.addSimbolo({id: this.id.text,tipo: 'var', tipoDado: this.tipo.text}) */
  }
}