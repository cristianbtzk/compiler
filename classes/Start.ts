import ListaBloco from "./ListaBloco";
import ListaParam from "./ListaParam";

export default class Start {
  public listaParam: ListaParam; 
  public listaBloco: ListaBloco; 

  constructor(listaParam: ListaParam, listaBloco: ListaBloco){
    this.listaParam = listaParam;
    this.listaBloco = listaBloco;
  }
}