import fs from 'fs'
interface VarDeclaration {
  [key: string]: '.word' | '.float' | '.double' | '.asciiz' | '.byte';
}


export default class GeracaoMIPS {
  private static instance: GeracaoMIPS;

  private variaveis: VarDeclaration = {};
  private codigo: string[] = [];

  private constructor() { }

  public static getInstance(): GeracaoMIPS {
    if (!this.instance) this.instance = new GeracaoMIPS()

    return this.instance;
  }

  public setVariavel(key: string, valor: '.word' | '.float' | '.double' | '.asciiz' | '.byte') {
    this.variaveis[key] = valor
  }

  public setVariaveis(variaveis: VarDeclaration) {
    this.variaveis = variaveis
  }

  public getVariaveis() {
    return this.variaveis
  }

  public getVariavel(key: string) {
    return this.variaveis[key]
  }

  public getCodigo() {
    return this.codigo;
  }

  public pushCodigo(cod: string) {
    this.codigo.push(cod)
  }

  public gravarArquivo(){
    const data = Object.keys(this.variaveis).map(key => {
      const tipo = this.variaveis[key]
      let defaultValue = ''
      switch (tipo) {
        case '.word':
          defaultValue = '0'
          break;
      
        default:
          break;
      }

      return `${key}: ${tipo} ${defaultValue}`
    }).join('\n')

    const text = this.codigo.join('\n')
    
    const codigo = `.data\n${data}\n.text\n${text}`

    fs.writeFileSync('./codigoGerado.txt', codigo)
  }
  
}