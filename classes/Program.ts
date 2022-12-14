
import ListaFuncao from "./ListaFuncao";
import Start from "./Start";

export default class Program {
  public listaFuncao: ListaFuncao; 
  public start: Start; 

  constructor(listaFuncao: ListaFuncao, start: Start ){
    this.listaFuncao = listaFuncao;
    this.start = start;
  }

  analisar(){
    if(this.listaFuncao) this.listaFuncao.analisar()
    this.start.analisar()
  }
  
  gerarCodigo(){
    this.start.gerarCodigo()
  }
}