import Token from "../Token";
import Comp from "./Comp";
import ListaBloco from "./ListaBloco";

export default class A_While {
  public t_while: Token;
  public comp: Comp;
  public listaBloco: ListaBloco;
  
  constructor(t_while: Token, comp: Comp, listaBloco: ListaBloco) {
    this.t_while = t_while;
    this.comp = comp;
    this.listaBloco = listaBloco;
  }
}