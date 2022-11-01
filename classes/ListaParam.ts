import Token from "../Token";
import ListaParam2 from "./ListaParam2";

export default class ListaParam {
  public id: Token;
  public listaParam2: ListaParam2;
  
  constructor(id: Token, listaParam2: ListaParam2) {
    this.id = id;
    this.listaParam2 = listaParam2;
  }
}