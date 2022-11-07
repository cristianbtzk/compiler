interface Simbolo {
  id: string;
  tipo: 'var' | 'fun';
  tipoDado?: string;
  valor?: string;
}

export default class TabelaSimbolos {
  private static instance: TabelaSimbolos;

  private escopos: Simbolo[][] = [[]];

  addEscopo() {
    this.escopos.unshift([])
    console.log('this.escopos');
    console.log(this.escopos);
    
  }

  removeEscopo() {
    this.escopos.shift()
  }

  findSimbolo(id: string) {
    for (const escopo of this.escopos) {
      for (const simbolo of escopo) {
        if (simbolo.id === id) return simbolo
      }
    }
    return null
  }

  checarSimbolo(id: string) {
    if(!this.findSimbolo(id)) throw new Error('Erro - tentanto utilizar ' + id + ' sem estar declarado'); 
  }

  addSimbolo({ id, tipo, tipoDado, valor }: Simbolo) {
    const simboloExiste = this.findSimbolo(id)
    console.log(this.escopos);

    if (simboloExiste) throw new Error(id + ' já declarado')

    this.escopos[0].push({
      id,
      tipo,
      tipoDado,
      valor
    })
  }













  private constructor() { }

  public static getInstance(): TabelaSimbolos {
    if (!this.instance) this.instance = new TabelaSimbolos()

    return this.instance;
  }
}