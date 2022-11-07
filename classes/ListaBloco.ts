import Command from "./Command";

export default class ListaBloco {
  public command: Command;
  public listaBloco: ListaBloco;

  constructor(command: Command, listaBloco: ListaBloco) {
    this.command = command;
    this.listaBloco = listaBloco;
  }

  analisar() {

    this.command.analisar()
    console.log('this.listaBloco');
    console.log(this.listaBloco);

    if (this.listaBloco) this.listaBloco.analisar()
  }
}