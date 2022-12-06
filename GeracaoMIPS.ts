import fs from 'fs'
import Queue from './Queue';
interface VarDeclaration {
  [key: string]: '.word' | '.float' | '.double' | '.asciiz' | '.byte';
}

interface LabelCode {
  [key: string]: string[];
}


export default class GeracaoMIPS {
  private static instance: GeracaoMIPS;

  private variaveis: VarDeclaration = {};
  private codigo: LabelCode = {};
  private pilhaLabel: Queue

  private labelCount = 1

  private constructor() {
    this.pilhaLabel = new Queue()
    this.pilhaLabel.enqueue('main')
    this.codigo['main'] = []
  }

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
    this.codigo[this.pilhaLabel.top()].push(cod)
  }

  public addNewBranch() {
    this.labelCount++
    this.pilhaLabel.enqueue(`label${this.labelCount}`)
    this.codigo[`label${this.labelCount}`] = []
  }

  public finishBranch() {
    this.codigo[this.pilhaLabel.top()].push(`j label${this.labelCount}_return`)
    this.pilhaLabel.dequeue()
  }

  public getNextLabel() {
    return `label${this.labelCount + 1}`
  }

  public gravarArquivo() {
    this.variaveis['newLine'] = '.asciiz'
    const data = Object.keys(this.variaveis).map(key => {
      console.log(key)
      const tipo = this.variaveis[key]
      console.log(tipo)
      let defaultValue = ''
      switch (tipo) {
        case '.word':
          defaultValue = '0'
          break;
        case '.asciiz':
          defaultValue = '"\\n"'
          break;
        default:
          break;
      }

      return `${key}: ${tipo} ${defaultValue}`
    }).join('\n')

    this.codigo['main'].push('li $v0, 10')
    this.codigo['main'].push('syscall')

    const text = Object.keys(this.codigo).map(label => `${label}:\n${this.codigo[label].join('\n')}`).join('\n')

    const codigo = `.data\n${data}\n.text\n${text}`

    fs.writeFileSync('./codigoGerado.txt', codigo)
  }

}