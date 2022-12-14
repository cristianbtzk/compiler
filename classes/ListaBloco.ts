import Command from "./Command";

export default class ListaBloco {
  public command: Command;
  public listaBloco: ListaBloco | null;

  constructor(command: Command, listaBloco: ListaBloco | null)  {
    this.command = command;
    this.listaBloco = listaBloco;
  }

  analisar() {

    this.command.analisar()

    if (this.listaBloco) this.listaBloco.analisar()
  }

  gerarCodigo(){
    this.command.gerarCodigo()
    if (this.listaBloco) this.listaBloco.gerarCodigo()

  }
}