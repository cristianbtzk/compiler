import TabelaSimbolos from "../TabelaSimbolos";
import Token from "../Token";
import Expr from "./Expr";
import Op from "./Op";

export default class Expr2 {
  public op: Op;
  public expr: Expr;
  
  constructor(op: Op, expr: Expr) {
    this.op = op;
    this.expr = expr;
  }

  analisar(tipoValor: 'const' | 'string' | 'bool' | 'char' | 'int'){
    return this.expr
  }
}