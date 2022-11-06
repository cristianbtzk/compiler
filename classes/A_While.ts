import Token from "../Token";
import Comp from "./Comp";
import ListaBloco from "./ListaBloco";

export default class A_While {
  public t_while: Token;
  public ap: Token;
  public comp: Comp;
  public fp: Token;
  public ac: Token;
  public listaBloco: ListaBloco;
  public fc: Token;
  
  constructor(t_while: Token, ap:Token, comp: Comp, fp:Token, ac:Token, listaBloco: ListaBloco, fc:Token,) {
    this.t_while = t_while;
    this.ap = ap;
    this.comp = comp;
    this.fp = fp;
    this.ac = ac;
    this.listaBloco = listaBloco;
    this.fc = fc;
  }
}