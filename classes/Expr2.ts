import TabelaSimbolos from "../TabelaSimbolos";
import Token from "../Token";
import Expr from "./Expr";
import Op from "./Op";

export default class Expr2 {
  public op: Token;
  public expr: Expr;

  constructor(op: Token, expr: Expr) {
    this.op = op;
    this.expr = expr;
  }

  analisar(tipoValor: 'string' | 'boolean' | 'char' | 'int'): string {
    return this.expr.analisar({ value: tipoValor, op: this.op })
  }

  gerarCodigo(tipoValor: 'string' | 'boolean' | 'char' | 'int'): string {
    return this.expr.gerarCodigo({ value: tipoValor, op: this.op })
  }
}