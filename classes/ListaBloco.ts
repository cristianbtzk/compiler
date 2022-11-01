import Command from "./Command";

export default class ListaBloco {
  public command: Command;
  public listaBloco: ListaBloco;
  
  constructor(command: Command, listaBloco: ListaBloco) {
    this.command = command;
    this.listaBloco = listaBloco;
  }
}