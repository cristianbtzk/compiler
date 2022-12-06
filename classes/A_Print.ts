import GeracaoMIPS from "../GeracaoMIPS";
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
    const geracaoMips = GeracaoMIPS.getInstance()
    const valorExpr = this.expr.gerarCodigo(null)

    switch (valorExpr) {
      case 'boolean':
      case 'int':
        geracaoMips.pushCodigo('li $v0, 1')
        geracaoMips.pushCodigo('move $a0, $t0')
        geracaoMips.pushCodigo('syscall')
        geracaoMips.pushCodigo('li $v0, 4')
        geracaoMips.pushCodigo('la $a0, newLine')
        geracaoMips.pushCodigo('syscall')
        break;

    case 'string':
        geracaoMips.pushCodigo('li $v0, 4')
        geracaoMips.pushCodigo('move $a0, $t0')
        geracaoMips.pushCodigo('syscall')
        geracaoMips.pushCodigo('li $v0, 4')
        geracaoMips.pushCodigo('la $a0, newLine')
        geracaoMips.pushCodigo('syscall')
      break
    
      default:
        break;
    }
  }
}