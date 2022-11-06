import Token from "../Token";
import Comp from "./Comp";
import ListaBloco from "./ListaBloco";

export default class If {
  public t_if: Token;
  public ap: Token;
  public comp: Comp;
  public fp: Token;
  public ac: Token;
  public listaBloco: ListaBloco;
  public fc: Token;
  
  constructor(t_if: Token, ap:Token, comp: Comp, fp:Token, ac:Token, listaBloco: ListaBloco, fc:Token,) {
    this.t_if = t_if;
    this.ap = ap;
    this.comp = comp;
    this.fp = fp;
    this.ac = ac;
    this.listaBloco = listaBloco;
    this.fc = fc;
  }
}