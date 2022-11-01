import Token from "../Token";
import ListaBloco from "./ListaBloco";
import ListaParam from "./ListaParam";

export default class Function {
  public id: Token; 
  public listaParam: ListaParam; 
  public listaBloco: ListaBloco;
  
  constructor(id: Token, listaParam: ListaParam, listaBloco: ListaBloco) {
    this.id = id;
    this.listaParam = listaParam;
    this.listaBloco = listaBloco;
  }
}