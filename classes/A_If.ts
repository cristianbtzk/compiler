import Token from "../Token";
import Expr from "./Expr";
import Command from "./Command";
import ListaBloco from "./ListaBloco";
import TabelaSimbolos from "../TabelaSimbolos";
import GeracaoMIPS from "../GeracaoMIPS";

export default class If implements Command{
  public t_if: Token;
  public ap: Token;
  public expr: Expr;
  public fp: Token;
  public ac: Token;
  public listaBloco: ListaBloco;
  public fc: Token;
  
  constructor(t_if: Token, ap:Token, expr: Expr, fp:Token, ac:Token, listaBloco: ListaBloco, fc:Token,) {
    this.t_if = t_if;
    this.ap = ap;
    this.expr = expr;
    this.fp = fp;
    this.ac = ac;
    this.listaBloco = listaBloco;
    this.fc = fc;
  }

  analisar() {
    const tabSimbolos = TabelaSimbolos.getInstance()
    this.expr.analisar(null)
    tabSimbolos.addEscopo()
    if(this.listaBloco) this.listaBloco.analisar()
    tabSimbolos.removeEscopo()
  }

  gerarCodigo(): void {
    const geracaoMips = GeracaoMIPS.getInstance()
    this.expr.gerarCodigo(null)
    const nextLabel = geracaoMips.getNextLabel()
    geracaoMips.pushCodigo(`bne $zero, $t0, ${nextLabel}`)
    geracaoMips.pushCodigo(`${nextLabel}_return:`)

    geracaoMips.addNewBranch()
    this.listaBloco.gerarCodigo()
    geracaoMips.finishBranch()
  }
}