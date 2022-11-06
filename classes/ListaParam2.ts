import Token from "../Token";

export default class ListaParam2 {
  public tipo: Token;
  public id: Token;
  public listaParam2: ListaParam2;

  constructor(tipo:Token, id: Token, listaParam2: ListaParam2) {
    this.tipo = tipo;
    this.id = id;
    this.listaParam2 = listaParam2;
  }
}