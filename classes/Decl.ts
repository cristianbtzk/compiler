import TabelaSimbolos from "../TabelaSimbolos";
import Token from "../Token";
import Command from "./Command";

export default class Decl implements Command{
  public tipo: Token;
  public id: Token;
  
  constructor(tipo: Token, id: Token) {
    this.tipo = tipo;
    this.id = id;
  }

  analisar(){
    const tabSimbolos = TabelaSimbolos.getInstance()
    
    tabSimbolos.addSimbolo({id: this.id.text,tipo: 'var', tipoDado: this.tipo.text as "string" | "char" | "bool" | "int" | undefined})
  }
}