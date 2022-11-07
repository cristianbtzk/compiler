import Token from "../Token";
import Comp from "./Comp";
import Command from "./Command";
import ListaBloco from "./ListaBloco";
import TabelaSimbolos from "../TabelaSimbolos";

export default class If implements Command{
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

  analisar() {
    console.log('this.listaBloco');
    console.log(this.listaBloco);
    
    const tabSimbolos = TabelaSimbolos.getInstance()
    this.comp.analisar()
    tabSimbolos.addEscopo()
    if(this.listaBloco) this.listaBloco.analisar()
    tabSimbolos.removeEscopo()
  }
}