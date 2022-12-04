import GeracaoMIPS from "../GeracaoMIPS";
import TabelaSimbolos from "../TabelaSimbolos";
import Token from "../Token";
import Command from "./Command";

export default class Decl implements Command {
  public tipo: Token;
  public id: Token;

  constructor(tipo: Token, id: Token) {
    this.tipo = tipo;
    this.id = id;
  }

  analisar() {
    const tabSimbolos = TabelaSimbolos.getInstance()

    tabSimbolos.addSimbolo({ id: this.id.text, tipo: 'var', tipoDado: this.tipo.text as "string" | "char" | "boolean" | "int" | undefined })
  }

  gerarCodigo() {
    const geracaoMips = GeracaoMIPS.getInstance()
    /* const tipoMips = {
      'string': '.asciiz',
      'char': '.byte',
      'int': '.page',
    } */

    let valor = '' as ".asciiz" | ".byte" | ".page" | ".float" | ".double"
    
    switch (this.tipo.text) {
      case 'string':
        valor = '.asciiz'
        break;
      case 'char':
        valor = '.byte'
        break
      case 'int':
        valor = '.page'
        break
      default:
        throw new Error("Erro ao buscar tipo");
    }

    if (!valor) throw new Error("Erro");


    geracaoMips.setVariavel(this.id.text, valor)
  }
}