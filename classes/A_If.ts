import Token from "../Token";
import Comp from "./Comp";
import ListaBloco from "./ListaBloco";

export default class Command {
  public t_if: Token;
  public comp: Comp;
  public listaBloco: ListaBloco;
  
  constructor(t_if: Token, comp: Comp, listaBloco: ListaBloco) {
    this.t_if = t_if;
    this.comp = comp;
    this.listaBloco = listaBloco;
  }
}