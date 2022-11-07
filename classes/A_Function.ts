import TabelaSimbolos from "../TabelaSimbolos";
import Token from "../Token";
import ListaBloco from "./ListaBloco";
import ListaParam from "./ListaParam";

export default class A_Function {
  public t_function: Token;
  public id: Token;
  public ap: Token;
  public listaParam: ListaParam;
  public fp: Token;
  public ac: Token;
  public listaBloco: ListaBloco;
  public fc: Token;

  constructor(t_function: Token, id: Token, ap: Token, listaParam: ListaParam, fp: Token, ac: Token, listaBloco: ListaBloco, fc: Token,) {
    this.t_function = t_function;
    this.id = id;
    this.ap = ap;
    this.listaParam = listaParam;
    this.fp = fp;
    this.ac = ac;
    this.listaBloco = listaBloco;
    this.fc = fc;
  }

  analisar() {
    const tabSimbolos = TabelaSimbolos.getInstance()
    tabSimbolos.addSimbolo({ id: this.id.text, tipo: 'fun' })
    tabSimbolos.addEscopo()
    if(this.listaParam) this.listaParam.analisar()
    if(this.listaBloco) this.listaBloco.analisar()
  }
}