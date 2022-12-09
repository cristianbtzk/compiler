import TabelaSimbolos from "../TabelaSimbolos";
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

  analisar() {
    console.log('Analisando start')
    const tabSimbolos = TabelaSimbolos.getInstance()
    tabSimbolos.addEscopo()
    if(this.listaParam) this.listaParam.analisar()
    console.log('this.listaBloco');
    console.log(this.start);
    
    if(this.listaBloco) this.listaBloco.analisar()
    tabSimbolos.removeEscopo()
    console.log('Fim analise start');
    
  }

  gerarCodigo(){
    this.listaBloco.gerarCodigo()
  }
}