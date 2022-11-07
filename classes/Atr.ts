import TabelaSimbolos from "../TabelaSimbolos";
import Token from "../Token";
import Command from "./Command";

export default class Atr implements Command{
  public id: Token;
  public atr: Token;
  public cons: Token;
  
  constructor(id: Token, atr: Token, cons: Token) {
    this.id = id;
    this.atr = atr;
    this.cons = cons;
  }

  analisar() {
    const tabSimbolos = TabelaSimbolos.getInstance()

    tabSimbolos.checarAtribuicao(this.id.text)
  }
}