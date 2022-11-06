import Token from "../Token";
import ListaParam2 from "./ListaParam2";

export default class ListaParam {
  public tipo: Token;
  public id: Token;
  public listaParam2: ListaParam2;
  
  constructor(tipo: Token, id: Token, listaParam2: ListaParam2) {
    this.tipo = tipo;
    this.id = id;
    this.listaParam2 = listaParam2;
  }
}