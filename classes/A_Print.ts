import TabelaSimbolos from "../TabelaSimbolos";
import Token from "../Token";
import Expr from "./Expr";

export default class A_Print {
  public t_print: Token;
  public ap: Token;
  public expr: Expr;
  public fp: Token;
  
  constructor(t_print: Token, ap:Token, expr: Expr, fp:Token,) {
    this.t_print = t_print;
    this.ap = ap;
    this.expr = expr;
    this.fp = fp;
  }

  analisar() {
    this.expr.analisar(null)

  }

  gerarCodigo(): void {
    
  }
}