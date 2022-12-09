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
    console.log('this.listaBloco');
    console.log(this.listaBloco);

    if (this.listaBloco) this.listaBloco.analisar()
  }

  gerarCodigo(){
    this.command.gerarCodigo()
    if (this.listaBloco) this.listaBloco.gerarCodigo()

  }
}