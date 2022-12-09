import TabelaSimbolos from "../TabelaSimbolos";
import Token from "../Token";

export default class Comp {
  public id: Token;
  public op_comp: Token;
  public cons: Token;
  
  constructor(id: Token, op_comp: Token, cons: Token) {
    this.id = id;
    this.op_comp = op_comp;
    this.cons = cons;
  }

  analisar() {
    const tabSimbolos = TabelaSimbolos.getInstance()
    tabSimbolos.checarVar(this.id.text)
  }
}