import A_Function from "./A_Function";

export default class ListaFuncao {
  public t_function: A_Function;
  public listaFuncao: ListaFuncao;

  constructor(t_function: A_Function, listaFuncao: ListaFuncao) {
    this.t_function = t_function;
    this.listaFuncao = listaFuncao;
  }

  analisar() {
    this.t_function.analisar();
    console.log(this.listaFuncao);
    
    if (this.listaFuncao) this.listaFuncao.analisar()
  }
}