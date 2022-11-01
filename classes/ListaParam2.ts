import Token from "../Token";

export default class ListaParam2 {
  public id: Token;
  public listaParam2: ListaParam2;

  constructor(id: Token, listaParam2: ListaParam2) {
    this.id = id;
    this.listaParam2 = listaParam2;
  }
}