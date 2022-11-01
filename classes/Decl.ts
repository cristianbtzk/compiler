import Token from "../Token";

export default class Decl {
  public tipo: Token;
  public id: Token;
  
  constructor(tipo: Token, id: Token) {
    this.tipo = tipo;
    this.id = id;
  }
}