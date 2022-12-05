import GeracaoMIPS from "../GeracaoMIPS";
import TabelaSimbolos from "../TabelaSimbolos";
import Token from "../Token";
import Command from "./Command";
import Expr from "./Expr";

export default class Atr implements Command{
  public id: Token;
  public atr: Token;
  public expr: Expr;
  
  constructor(id: Token, atr: Token, expr: Expr) {
    this.id = id;
    this.atr = atr;
    this.expr = expr;
  }

  analisar() {
    const tabSimbolos = TabelaSimbolos.getInstance()
    const valorExpr = this.expr.analisar(null)

    tabSimbolos.checarAtribuicao(this.id.text, valorExpr)
  }

  gerarCodigo(): void {
    const geracaoMips = GeracaoMIPS.getInstance()
    const valorExpr = this.expr.gerarCodigo(null)

    switch (valorExpr) {
      case 'int':
        geracaoMips.pushCodigo(`sw $t0, ${this.id.text}`)
        break;
    
      default:
        break;
    }
  }
}