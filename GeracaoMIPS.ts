interface VarDeclaration {
  [key: string]: '.page' | '.float' | '.double' | '.asciiz' | '.byte';
}

export default class GeracaoMIPS {
  private static instance: GeracaoMIPS;

  private variaveis: VarDeclaration = {};

  private constructor() { }

  public static getInstance(): GeracaoMIPS {
    if (!this.instance) this.instance = new GeracaoMIPS()

    return this.instance;
  }

  public setVariavel(key: string, valor: '.page' | '.float' | '.double' | '.asciiz' | '.byte') {
    this.variaveis[key] = valor
  }

  public setVariaveis(variaveis: VarDeclaration) {
    this.variaveis = variaveis
  }

  public getVariaveis() {
    return this.variaveis
  }
}