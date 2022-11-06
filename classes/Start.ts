import Token from "../Token";
import ListaBloco from "./ListaBloco";
import ListaParam from "./ListaParam";

export default class Start {
  public start: Token; 
  public ap: Token; 
  public listaParam: ListaParam; 
  public fp: Token; 
  public ac: Token; 
  public listaBloco: ListaBloco; 
  public fc: Token; 

  constructor(start: Token, ap: Token, listaParam: ListaParam, fp: Token, ac: Token,  listaBloco: ListaBloco, fc: Token, ){
    this.start = start;
    this.ap = ap;
    this.listaParam = listaParam;
    this.fp = fp;
    this.ac = ac;
    this.listaBloco = listaBloco;
    this.fc = fc;
  }
}